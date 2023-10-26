import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    commentId: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
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
    likes: {
        type: Number, 
        default: 0
    },
    dislikes: {
        type: Number, 
        default: 0
    },
    replies: {
        type: String, 
        ref: "Comment.commentId"
    }
});

const Comment = new model("Comment", commentSchema);

export {Comment};

