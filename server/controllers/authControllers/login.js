import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { User } from "../../models/userModel.js";

config();

const login = async (user) => {
    try {
        let { email, password } = user;
        email = email.toLowerCase();

        const failMessage = `Invalid email or password`;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return { message: failMessage, success: false };

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) return { message: failMessage, success: false };

        const token = jwt.sign(
            { userId: userId },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        console.log(`Login with email ${email} successful`);
        return { token: token, message: "Login successful", success: true };
    } catch (error) {
        console.error("Error logging user. \nERROR : ", error.message);
        return { message: "Error logging in", success: false };
    }
}

export default login;