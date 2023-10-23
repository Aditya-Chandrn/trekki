import { Router } from "express";

import login from "../controllers/authControllers/login.js";
import signup from "../controllers/authControllers/signup.js";
import { setTokenCookie } from "../middlewares/cookieManagement.js";

const router = Router();

//login
router.post("/login", async (req, res, next) => {
    const user = req.body;
    const response = await login(user);

    res.clearCookie("token");
    if (response.success) {
        req.token = response.token;
        next();
    }
    res.send({ message: response.message, success: response.success });
}, setTokenCookie);

//signup
router.post("/signup", async (req, res, next) => {
    const newUser = req.body;
    const token = req.cookies.token;
    if(token){
        res.send(({message: "Already logged in. Redirecting to home page.", success: true}));
        return;
    }
    const response = await signup(newUser);

    if (response.success) {
        req.token = response.token;
        next();
    }
    res.send({ message: response.message, success: response.success });
}, setTokenCookie);

router.get("/checkLogged", (req,res) => {
    if(req.cookies.token) res.send({success: true});
    else res.send({message: "Login needed to create blog.", success: false});
});

export default router;