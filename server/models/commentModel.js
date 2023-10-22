import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    commentId: {
        type: String,
        unique: true,
        required: true
    },
    blog: {
        type: String,
        ref: "Blog.blogId"
    },
    commentedBy: {
        type: String,
        ref: "User.userId"
    }, 
    likes: true,
    dislikes: true,
    replies: {
        type: String, 
        ref: "Comment.commentId"
    }
});

const Comment = new model("Comment", commentSchema);

export {Comment};

