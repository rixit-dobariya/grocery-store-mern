import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/index.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const uploadImage = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    // Delete the file if upload fails too
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.log(error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Function to delete an image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === 'ok') {
      console.log(`Image with public ID ${publicId} deleted successfully.`);
      return true;
    } else {
      console.log(`Failed to delete image with public ID ${publicId}.`);
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

export { uploadImage, deleteImage };
