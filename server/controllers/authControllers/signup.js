import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { User } from "../../models/userModel.js";

const signup = async (user) => {
    let {email, fname, lname, password} = user;
    email = email.toLowerCase();

    const userId = await getUserId();
    if(!userId) return ({message : "Couldn't create new account."});

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
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({userId, fname, lname, email, password : encryptedPassword, createdDate});
        await newUser.save();

        //update userId in AvailableId
        const nextUserId = "U-" + (parseInt(userId.slice(2,), 16) + 1).toString(16).padStart(4, "0").toUpperCase();
        const AvailableId = mongoose.connection.collection("AvailableId");
        await AvailableId.updateOne(
            {},
            { $set: { "userId": nextUserId }}
        )
        .then(() => {
            console.log(`Updated blogId in AvailableId`);
        })
        .catch((error) => {
            console.log(`Couldn't update userId in AvailableId collection \n ------ ERROR ----- \n ${error.message} \n ------------------`);
        });

        //create token for cookie
        const token = jwt.sign(
            { userId: userId },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        await session.commitTransaction();
        session.endSession();
        console.log(`New account with email ${email} created.`);
        return {message : "Account created successfully.", token : token, success: true};
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error("Error creating new account. \nERROR : ",error.message);
        return { message: "Error creating new account.", success: false };
    }
}

const getUserId = async () => {
    try {
        const AvailableId = mongoose.connection.collection("AvailableId");
        const doc = await AvailableId.findOne({})

        if (doc) {
            const userId = doc.userId;
            return userId;
        }
        else console.log("---- Document not found ----");
    } catch (error) {
        console.log(`Couldn't retrieve document form AvailableId collection. \n ------ ERROR ----- \n ${error.message} \n ------------------`)
    }
}

export default signup;