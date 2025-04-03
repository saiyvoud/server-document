import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY
const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH
const PORT = process.env.PORT
export {SECRET_KEY,SECRET_KEY_REFRESH,PORT}