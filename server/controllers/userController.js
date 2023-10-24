import { User } from "../models/userModel.js";

const getUserData = async (userId) => {
    try {
        const userData = await User.findById(userId);
        return ({ userData: userData, success: true });
    } catch (error) {
        console.log(`Unable to fetch data of user ${userId}. \nERROR : `, error.message);
        return ({ message: "Unable to fetch user data.", success: false});
    }
}

export default getUserData;