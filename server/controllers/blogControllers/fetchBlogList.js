import { Blog } from "../../models/blogModel.js";
import { User } from "../../models/userModel.js";

const fetchBlogList = async (filters) => {
    Object.keys(filters).forEach(field => {
        filters[field] = filters[field].trim().replace(/\s+/g," ");
    });

    const { author, heading, place, fromDate, tillDate } = filters;
    const [fname, lname] = author.split(" ");
    const fnameRegex = new RegExp(`.*${fname}.*`, "i");
    const lnameRegex = new RegExp(`.*${lname}.*`, "i");
    const headingRegex = new RegExp(`.*${heading}.*`, "i");
    const placeRegex = new RegExp(`.*${place}.*`, "i");

    //user query
    const userQuery = lname ? {
            fname: fnameRegex,
            lname: lnameRegex
        } : {
        $or: [
            {fname: fnameRegex},
            {lname: fnameRegex}
        ]
    };

    let users = await User.find(userQuery).select("_id");
    users = users.map(user => user._id);

    //date query
    let dateQuery;
    if(fromDate!== "" && tillDate==="") dateQuery = {createdDate: {$gte: fromDate}};
    else if(fromDate=== "" && tillDate!=="") dateQuery = {createdDate: {$lte: tillDate}};
    else if(fromDate=== "" && tillDate==="") dateQuery = {}
    else dateQuery = {createdDate: {
            $gte: fromDate, 
            $lte: tillDate
        }}

    //get blogs that much the filters
    try{
        let blogList = await Blog.find({
            author : {$in: users},
            heading: headingRegex,
            place: placeRegex,
            ...dateQuery
        });

        blogList = await Promise.all(blogList.map(async(blog) => {
            const {fname, lname} = await User.findById(blog.author).select("fname lname");
            const newBlog = {
                ...blog.toObject(),
                author: {fname, lname}
            };
            delete newBlog.contents;
            delete newBlog.__v;
            newBlog.comments = newBlog.comments.length;
            return newBlog;
        }));

        console.log(blogList);

        console.log("Blogs fetched successfully");
        if(blogList.length === 0) {
            return {message: "No blog with given filter found.", success: false};
        }
        return {message : "Blogs with selected filter fetched successfully", blogList : blogList, success: true};
    } catch (error) {
        console.log("Error fetching blogs. \nERROR : ",error.message);
        return({message: "Error fetching blogs.", success: false});
    }
}

export default fetchBlogList;