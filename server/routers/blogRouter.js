import {Router} from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import createBlog from "../controllers/blogControllers/createBlog.js";
import fetchBlogList from "../controllers/blogControllers/fetchBlogList.js";
import fetchBlog from "../controllers/blogControllers/fetchBlog.js";

const router = Router();

router.post("/create", async (req,res) => {
    const blogData = req.body;
    const token = req.cookies.token;
    let userId;
    if(token){
        try{
            config();
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            userId = decodedToken.userId;
        } catch (error) {
            console.log("Error verifying token. \nERROR : ",error.message);
        }
    }

    if (blogData.contents.length === 0) {
        res.send({message : "Can't make a blog with no content.", success: false});
        return;
    }
    const result = await createBlog(blogData, userId);
    res.send(result);
});

router.post("/fetchBlogList", async (req,res) => {
    const filters = req.body;
    const result = await fetchBlogList(filters);
    res.send(result);
});

router.get("/fetchBlog/:id", async(req,res) => {
    const blogId = req.params.id;
    const result = await fetchBlog(blogId);
    res.send(result);
});

export default router;