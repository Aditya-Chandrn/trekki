import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    userId : {
        type: String,
        required: true,
        unique: true
    },
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

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

const User = new model("User", userSchema);

export {User};