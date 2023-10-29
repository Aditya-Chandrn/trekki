import {storageBucket} from "../configs/fireStorageConfig.js";

const storeImage = async (image, fileName) => {
    const file = storageBucket.file(fileName);

    const writeStream = file.createWriteStream({
        metadata : {
            contentType: "image/jpeg"
        }
    });

    writeStream.on("error", error => {
        console.log("Error uploading image to Firebase. \nERROR : ",error.message);
    });

    writeStream.on("finish", async () => {
        console.log(`${fileName} uploaded successfully.`);
    });

    const base64String = image.replace(/^data:image\/\w+;base64,/, '');
    const base64Image = Buffer.from(base64String, "base64");
    writeStream.end(base64Image);
    return fileName;
}

export default storeImage;