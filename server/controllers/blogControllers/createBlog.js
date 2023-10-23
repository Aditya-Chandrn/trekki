import mongoose from "mongoose";
import { Blog } from "../../models/blogModel.js";
import { User } from "../../models/userModel.js";

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
        const blog = new Blog({
            author: userId,
            heading: blogData.heading,
            place: blogData.place,
            contents: blogData.contents,
            createdDate: createdDate
        });

        //save blog to database
        let blogId;
        try {
            const savedBlog = await blog.save()
            blogId = savedBlog._id;
            console.log(`New blog with id ${blogId} added to database`);
        } catch (error) {
            console.log(`Error adding blog ${blogId} to database \n ------ ERROR ----- \n ${error.message} \n ------------------`);
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
        return successMessage;
    }
    catch (error) {
        //reset all changes on failure
        await session.abortTransaction();
        session.endSession();
        console.log(failMessage + `\n ------ ERROR ----- \n ${error.message} \n ------------------`);
        return failMessage;
    }
}

export default createBlog;