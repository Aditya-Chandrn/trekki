import { Schema, model } from "mongoose";

const contentSchema = new Schema({
    text: {
        type: String,
        required: function(){
            return this.isText === true;
        }
    },
    image: {
        type: [Number],
        required: function(){
            return this.isText === false;
        }
    },
    isText: {
        type: Boolean,
        require: true
    }
});

const blogSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    contents : [contentSchema],
    author: {
        type: String,
        ref: "User.userId",
        required: true
    },
    place: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    lastEditedDate: Date,
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: String,
        ref: "Comment.commentId"
    }]
});

const Blog = new model("Blog", blogSchema);

export { Blog };