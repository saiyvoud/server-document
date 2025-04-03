import connected from "../config/db_mysql.js";
import { EMessage, SMessage } from "../service/message.js";
import { SendCreate, SendError, SendSuccess } from "../service/response.js";
import { ValidateData } from "../service/validate.js";
import { v4 as uuidv4 } from "uuid"
import { DecryptData, EncryptData, FindOneEmail, GenerateToken } from "../service/service.js";
export default class UserController {
    static async Register(req, res) {
        try {
            const { username, email, password, phoneNumber, faculty_id, office_id } = req.body;
            const validate = await ValidateData({
                username, email, password,
                phoneNumber, faculty_id, office_id
            });
            if (validate.length > 0) {
                return SendError(res, 400, EMessage.BadRequest, validate.join(","));
            }
            const generatePassword = await EncryptData(password);
            if (!generatePassword) {
                return SendError(res, 404, EMessage.NotFound)
            }
            const user_id = uuidv4()
            const insert = `Insert into user 
            (user_id,username,email,password,phone_number,faculty_id,office_id) values (?,?,?,?,?,?,?)`
            connected.query(insert, [user_id, username, email, generatePassword,
                phoneNumber, faculty_id, office_id,], (err) => {
                    if (err) {
                        return SendError(res, 404, EMessage.EInsert, err);
                    }
                    return SendCreate(res, SMessage.Register);
                })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error);
        }
    }
    static async Login(req, res) {
        try {
            const { email, password } = req.body;
            const validate = await ValidateData({ email, password });
            if (validate.length > 0) {
                return SendError(res, 400, EMessage.BadRequest, validate.join(","));
            }
            const user = await FindOneEmail(email);
            const decode = await DecryptData(user.password);
            if (password !== decode) {
                return SendError(res, 404, EMessage.NotMatch);
            }
            user.password = undefined;
          
            const token = await GenerateToken(user.user_id);
            const data = Object.assign(
                JSON.parse(JSON.stringify(user)),
                JSON.parse(JSON.stringify(token))
            );
            return SendSuccess(res, SMessage.Login, data)
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error);
        }
    }
}