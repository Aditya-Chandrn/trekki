import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import login from "../controllers/authControllers/login.js";
import signup from "../controllers/authControllers/signup.js";
import { setTokenCookie } from "../middlewares/cookieManagement.js";
import getUserData from "../controllers/userController.js";

const router = Router();

//login
router.post("/login", async (req, res, next) => {
    const user = req.body;
    const response = await login(user);

    res.clearCookie("token",{path:"/"});
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
    if (token) {
        res.send(({ message: "Already logged in. Redirecting to home page.", success: true }));
        return;
    }
    const response = await signup(newUser);

    if (response.success) {
        req.token = response.token;
        next();
    }
    res.send({ message: response.message, success: response.success });
}, setTokenCookie);

router.get("/checkLogged", async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        let userId;
        try {
            config();
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            userId = decodedToken.userId;
        } catch (error) {
            console.log("Error decoding token.");
            res.send({ message: "Unable to get user data.", success: false });
        }
        const result = await getUserData(userId);
        res.send(result);
    }
    else res.send({ message: "Login needed.", success: false });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token", {path:"/"});
    res.send({ message: "Logged out successfully." });
});

export default router;