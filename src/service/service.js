import CryptoJS from "crypto-js"
import { SECRET_KEY, SECRET_KEY_REFRESH } from "../config/globayKey.js"
import jwt from "jsonwebtoken"
import connected from "../config/db_mysql.js"
import { EMessage } from "./message.js"


export const VerifyToken = async (token) => {
    return new Promise(async (resovle, reject) => {
        try {
            jwt.verify(token, SECRET_KEY, async (err, decode) => {
                if (err) return reject(err);
                const checkRole = `select * from role_user  
                INNER JOIN role on role_user.role_id COLLATE utf8mb4_general_ci = role.role_id
                where user_id=?`
                connected.query(checkRole, decode.id, (err, result) => {
                    if (err) return reject("Error CheckRoleUser");
                    if (!result[0]) {
                        return reject(EMessage.NotFound + " role user")
                    }
                    return resovle(result[0])
                })
            });
        } catch (error) {
            return reject(error);
        }
    });
};
export const EncryptData = async (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}
export const DecryptData = async (data) => {
    const decrypt = CryptoJS.AES.decrypt(data, SECRET_KEY.toString()).toString(CryptoJS.enc.Utf8);
    return decrypt;
}
export const FindOneEmail = async (email) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkEmail = "Select * from user where email=?";
            connected.query(checkEmail, email, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}

export const FindOneRole = async (role_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkRole = "Select * from role where role_id=?";
            connected.query(checkRole, role_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}
export const FindOnePermission = async (permission_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkPermission = "Select * from permission where permission_id=?";
            connected.query(checkPermission, permission_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}
export const CheckRoleInPermissionRole = async (role_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkPermissionRole = `select * from permission_role
            INNER JOIN permission on permission_role.permission_id COLLATE utf8mb4_general_ci = permission.permission_id
            where role_id=?`;
            connected.query(checkPermissionRole,role_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}
export const FindOneOffice = async (office_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkOffice = "Select * from office where office_id=?";
            connected.query(checkOffice, office_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}
export const FindOneFaculty = async (faculty_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkFaculty = "Select * from faculty where faculty_id=?";
            connected.query(checkFaculty, faculty_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}

export const FindOneUser = async (user_id) => {
    return new Promise(async (resovle, reject) => {
        try {
            const checkUser = "Select * from user where user_id=?";
            connected.query(checkUser, user_id, (err, result) => {
                if (err) return reject(EMessage.NotFound + err)
                if (!result[0]) return reject(EMessage.NotFound)
                return resovle(result[0])
            })
        } catch (error) {
            return reject(error);
        }
    })
}
export const GenerateToken = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                id: data,
            };
            const payload_refresh = {
                id: data,
            };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
            const refreshToken = jwt.sign(payload_refresh, SECRET_KEY_REFRESH, {
                expiresIn: "5h",
            });
             // ຖອດລະຫັດ token ເພື່ອເອົາຄ່າ exp
             const decoded = jwt.decode(token);
             const decodedRefresh = jwt.decode(refreshToken);
             
             resolve({ 
                 token, 
                 refreshToken,
                 tokenExpireAt: decoded.exp, // ປ່ຽນຈາກວິນາທີເປັນມິລິວິນາທີ
                 refreshTokenExpireAt: decodedRefresh.exp 
             });
 
        } catch (error) {
            reject(error);
        }
    });
}