import mongoose from "mongoose";
import { Blog } from "../../models/blogModel.js";
import { User } from "../../models/userModel.js";

const createBlog = async (blogData) => {
    const user = "banana";
    const blogId = await getBlogId();
    if (!blogId) return `Couldn't create blog`;

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
            blogId: blogId,
            author: user,
            heading: blogData.heading,
            place: blogData.place,
            contents: blogData.contents,
            createdDate: createdDate
        });

        //save blog to database
        await blog.save()
            .then(() => {
                console.log(`New blog with id ${blogId} added to database`);
            })
            .catch((error) => {
                console.log(`Error adding blog ${blogId} to database \n ------ ERROR ----- \n ${error.message} \n ------------------`);
            });

        //store blogId in user's blogs field
        await User.findOneAndUpdate(
            { userId: user },
            {$push: { "blogs": blogId }}
        )
        .then(() => {
            console.log(`Blog ${blogId} added to user ${user}`);
        })
        .catch((error) => {
            console.log(`Error adding blog ${blogId} to user ${user} \n ------ ERROR ----- \n ${error.message} \n ------------------`);
        });

        //update blogId in AvailableId
        const nextBlogId = "B-" + (parseInt(blogId.slice(2,), 16) + 1).toString(16).padStart(6, "0").toUpperCase();
        const AvailableId = mongoose.connection.collection("AvailableId");
        await AvailableId.updateOne(
            {},
            { $set: { "blogId": nextBlogId }}
        )
        .then(() => {
            console.log(`Updated blogId in AvailableId`);
        })
        .catch((error) => {
            console.log(`Couldn't update blogId in AvailableId collection \n ------ ERROR ----- \n ${error.message} \n ------------------`);
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

const getBlogId = async () => {
    try {
        const AvailableId = mongoose.connection.collection("AvailableId");
        const doc = await AvailableId.findOne({})

        if (doc) {
            const blogId = doc.blogId;
            return blogId;
        }
        else console.log("---- Document not found ----");
    } catch (error) {
        console.log(`Couldn't retrieve document form AvailableId collection. \n ------ ERROR ----- \n ${error.message} \n ------------------`)
    }
}

export default createBlog;