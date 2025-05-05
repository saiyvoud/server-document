import dotenv from "dotenv";
dotenv.config();

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};