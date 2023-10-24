import {Router} from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import createBlog from "../controllers/blogControllers/createBlog.js";

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
    const result = await createBlog(blogData, userId);
    res.send(result);
})

export default router;