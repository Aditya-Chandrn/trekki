import { Blog } from "../../models/blogModel.js";
import getImage from "../../middlewares/getImage.js";
import { User } from "../../models/userModel.js";

const fetchBlog = async (blogId) => {
    try {
        let blog = await Blog.findById(blogId);

        const contents = await Promise.all(blog.contents.map(async(content) => {
            if(content.isText) return content;
            const image = await getImage(content.image);
            return {isText: false, image: image};
        }));

        const {fname, lname} = await User.findById(blog.author).select("fname lname");
        blog = blog.toObject();
        blog["authorName"] = `${fname} ${lname}`;

        delete blog.__v;
        delete blog._id;
        
        blog["contents"] = contents;
        console.log("Blog fetched successfully");
        return({message: "Blog fetched successfully.", blogData: blog, success: true});
    } catch (error) {
        console.log("Error fetching blog data. \nERROR : ",error.message);
        return({message: "Unable to fetch blog.", success: false});
    }
}

export default fetchBlog;