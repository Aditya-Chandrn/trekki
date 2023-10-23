import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { User } from "../../models/userModel.js";

const signup = async (user) => {
    let {email, fname, lname, password} = user;
    email = email.toLowerCase();

    const currentDate = new Date();
    const createdDate = currentDate.toISOString().split("T")[0];

    //create session
    let session;

    try{
        session = await mongoose.startSession();
        session.startTransaction();
        
        const existingUser = await User.findOne({ email: email });
        if(existingUser) return {message: `An account with email ${email} already exists.`, success: false};
        
        //hash password
        const encryptedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new User({fname, lname, email, password : encryptedPassword, createdDate});
        const userId = (await newUser.save())._id;

        //create token for cookie
        const token = jwt.sign(
            { userId: userId },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        await session.commitTransaction();
        session.endSession();
        console.log(`New account with user ID ${userId} created.`);
        return {message : "Account created successfully.", token : token, success: true};
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error creating new account. \nERROR : ",error.message);
        return { message: "Error creating new account.", success: false };
    }
}

export default signup;