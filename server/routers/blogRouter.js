import {Router} from "express";
import createBlog from "../controllers/blogControllers/createBlog.js";

const router = Router();

router.post("/create", async (req,res) => {
    const blogData = req.body;
    const result = await createBlog(blogData)
    res.send(result);
})

export default router;