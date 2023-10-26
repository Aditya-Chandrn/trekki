import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    fname : {
        type: String,
        required: true,
    },
    lname : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: String,
    blogs: {
        type: [String],
        default: []
    },
    createdDate: {
        type: String,
        required: true
    },
    likedPosts: [String],
    dislikedPosts: [String],
    comments: [{
        type: String,
        ref: "Comment.commentId"
    }]
});

const User = new model("User", userSchema);

export {User};