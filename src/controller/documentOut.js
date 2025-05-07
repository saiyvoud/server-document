import connected from "../config/db_mysql.js";
import { EMessage, SMessage, StatusDocument } from "../service/message.js";
import { SendCreate, SendError, SendSuccess } from "../service/response.js";
import { ValidateData } from "../service/validate.js";
import { v4 as uuidv4 } from "uuid"
import { FindOneDocumentIn, FindOneDocumentOut, FindOnePartSuppile } from "../service/service.js";
export default class DocumentOutController {
    static async Search(req, res) {
        try {
            const search = req.query.search;
            const query = `SELECT * FROM document_out WHERE numberID LIKE ?`;
            const values = [`%${search}%`];
            connected.query(query, values, (err, result) => {
                if (err) return SendError(res, 404, EMessage.NotFound, err);
                if (!result[0]) return SendError(res, 404, EMessage.NotFound);
                return SendSuccess(res, SMessage.Search, result);
            });
        } catch (error) {
            return SendError(res, 500, EMessage.Eserver, error);
        }
    }
    static async SelectAll(req, res) {
        try {
            const select = `select * from document_out 
            INNER JOIN part_suppile on document_out.part_suppile_id COLLATE utf8mb4_general_ci = part_suppile.part_suppile_id
            INNER JOIN document_in on document_out.document_in_id COLLATE utf8mb4_general_ci = document_in.document_in_id
            INNER JOIN faculty on document_out.faculty_id COLLATE utf8mb4_general_ci = faculty.faculty_id`;
            connected.query(select, (err, result) => {
                if (err) return SendError(res, 404, EMessage.ESelectAll, err);
                if (!result[0]) return SendError(res, 404, EMessage.NotFound);
                return SendSuccess(res, SMessage.SelectAll, result);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error);
        }
    }
    static async SelectOne(req, res) {
        try {
            const document_out_id = req.params.document_out_id;
            if (!document_out_id) return SendError(res, 400, EMessage.BadRequest, "document_out_id");
            await FindOneDocumentOut(document_out_id);
            const select = `select * from document_out 
            INNER JOIN part_suppile on document_out.part_suppile_id COLLATE utf8mb4_general_ci = part_suppile.part_suppile_id
            INNER JOIN document_in on document_out.document_in_id COLLATE utf8mb4_general_ci = document_in.document_in_id
            INNER JOIN faculty on document_out.faculty_id COLLATE utf8mb4_general_ci = faculty.faculty_id WHERE document_id=?`;
            connected.query(select, document_out_id, (err, result) => {
                if (err) return SendError(res, 404, EMessage.NotFound, err);
                if (!result[0]) return SendError(res, 404, EMessage.NotFound);
                return SendSuccess(res, SMessage.SelectOne, result[0]);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error);
        }
    }
    static async Insert(req, res) {
        try {
            const { document_in_id, part_suppile_id, faculty_id } = req.body;
            const validate = await ValidateData({ titile, numberID, part_suppile_id, faculty_id });
            if (validate.length > 0) {
                return SendError(res, 400, EMessage.BadRequest, validate.join(","))
            }
            await FindOneDocumentIn(document_in_id)
            await FindOnePartSuppile(part_suppile_id);
            const document_out_id = uuidv4();
            const insert = "insert into document_out (document_out_id,numberID, ,document_in_id, part_suppile_id, faculty_id,status) values (?,?,?,?,?)";
            const numberID = Math.floor(10000 + Math.random() * 90000);
            connected.query(insert, [document_out_id, numberID, document_in_id, part_suppile_id, faculty_id, StatusDocument.padding], (err) => {
                if (err) return SendError(res, 404, EMessage.EInsert, err);
                return SendCreate(res, SMessage.Insert);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
    static async UpdateStatus(req, res) {
        try {
            const document_out_id = req.params.document_out_id;
            if (!document_out_id) return SendError(res, 400, EMessage.BadRequest, "document_out_id");
            await FindOneDocumentIn(document_out_id);
            const { status } = req.body;
            const checkStatus = Object.assign(StatusDocument);
            if (!checkStatus.includes(status)) {
                return SendError(res, 400, EMessage.BadRequest);
            }
            const update = "update document_in set status=? where document_out_id=?";
            connected.query(update, [status, document_out_id], (err) => {
                if (err) return SendError(res, 404, EMessage.EUpdate, err);
                return SendSuccess(res, SMessage.Update);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
    // static async UpdateDocumentOut(req, res) {
    //     try {
    //         const document_out_id = req.params.document_out_id;
    //         if (!document_out_id) return SendError(res, 400, EMessage.BadRequest, "document_out_id");
    //         await FindOneDocumentOut(document_out_id);
    //         const { titile, numberID, part_suppile_id, faculty_id } = req.body;
    //         const validate = await ValidateData({ titile, numberID, part_suppile_id, faculty_id });
    //         if (validate.length > 0) {
    //             return SendError(res, 400, EMessage.BadRequest, validate.join(","))
    //         }
    //         const update = "update document_out set document_in_id=?, part_suppile_id=?, faculty_id=? where document_out_id=?";
    //         connected.query(update, [titile, numberID, part_suppile_id, faculty_id, document_out_id], (err) => {
    //             if (err) return SendError(res, 404, EMessage.EUpdate, err);
    //             return SendSuccess(res, SMessage.Update);
    //         })
    //     } catch (error) {
    //         return SendError(res, 500, EMessage.ServerInternal, error)
    //     }
    // }

    static async DeleteDocumentOut(req, res) {
        try {
            const document_out_id = req.params.document_out_id;
            if (!document_out_id) return SendError(res, 400, EMessage.BadRequest, "document_out_id");
            await FindOneDocumentOut(document_out_id); (document_out_id);
            const deletedocument_out = "Delete from document_out where document_out_id=?";
            connected.query(deletedocument_out, document_out_id, (err) => {
                if (err) return SendError(res, 404, EMessage.EDelete, err);
                return SendSuccess(res, SMessage.Delete);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
}