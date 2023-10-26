import mongoose from "mongoose";
import { Blog } from "../../models/blogModel.js";
import { User } from "../../models/userModel.js";
import storeImage from "../../middlewares/storeImage.js";

const createBlog = async (blogData, userId) => {
    const currentDate = new Date();
    const createdDate = currentDate.toISOString().split("T")[0];

    const successMessage = `New blog with created successfully.`;
    const failMessage = `Couldn't create new blog. Resetting all changes.`;

    //create session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //create blog data
        let editedContents = [] 
        const blog = new Blog({
            author: userId,
            heading: blogData.heading,
            place: blogData.place,
            createdDate: createdDate
        });
        
        const blogId = blog._id;
        
        //store images in firebase and store their path
        editedContents = await Promise.all(blogData.contents.map(async(content, index) => {
            if(content.isText === true){
                return content;
            }
            else {
                const imageUrl = await storeImage(content.image, blogId, index);
                return {isText : false, image : imageUrl};
            }
        }));
        blog.contents = editedContents;

        //save blog to database
        try {
            await blog.save()
            console.log(`New blog with id ${blogId} added to database`);
        } catch (error) {
            console.log(`Error adding blog ${blogId} to database \n ------ ERROR ----- \n ${error.message} \n ------------------`);
            return({message : "Error creating blog", success: false});
        };

        //store blogId in user's blogs field
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { "blogs": blogId } }
        )
            .then(() => {
                console.log(`Blog ${blogId} added to user ${userId}`);
            })
            .catch((error) => {
                console.log(`Error adding blog ${blogId} to user ${userId} \n ------ ERROR ----- \n ${error.message} \n ------------------`);
            });

        //commit all changes on success
        await session.commitTransaction();
        session.endSession();
        console.log("---------------------------------------------------");
        return {message : successMessage, success: true};
    }
    catch (error) {
        //reset all changes on failure
        await session.abortTransaction();
        session.endSession();
        console.log(failMessage + `\n ------ ERROR ----- \n ${error.message} \n ------------------`);
        return {message : failMessage, success: false};
    }
}

export default createBlog;