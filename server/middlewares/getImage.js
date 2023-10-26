import {storageBucket} from "../configs/fireStorageConfig.js";

const getImage = async (fileName) => {
    const file = storageBucket.file(fileName);
    try{
        const data = await file.download();
        const imageBuffer = data[0];
        const base64Image = imageBuffer.toString("base64");
        return base64Image;
    } catch (error) {
        console.log("Error getting image from Firebase. \nERROR : ",error.message);
    }
}

export default getImage;