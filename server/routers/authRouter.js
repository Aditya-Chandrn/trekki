import { Router } from "express";

import login from "../controllers/authControllers/login.js";
import signup from "../controllers/authControllers/signup.js";
import {setTokenCookie} from "../middlewares/cookieManagement.js";

const router = Router();

//login
router.post("/login", async (req,res, next) => {
    const user = req.body;
    const response = await login(user);

    if(response.success) {
        req.token = response.token;
        next();
    }
    res.send(response.message);
}, setTokenCookie);

//signup
router.post("/signup", async (req,res, next) => {
    const newUser = req.body;
    console.log(newUser);
    // return;
    const response = await signup(newUser);

    if(response.success) {
        req.token = response.token;
        next();
    }
    res.send(response.message);
}, setTokenCookie);

export default router;