import connected from "../config/db_mysql.js";
import { EMessage, SMessage } from "../service/message.js";
import { SendCreate, SendError, SendSuccess } from "../service/response.js";
import { ValidateData } from "../service/validate.js";
import { v4 as uuidv4 } from "uuid"
import {FindOneDocumentIn} from "../service/service.js";
export default class DocumentInController {
    static async SelectAll(req, res) {
        try {
            const select = "select * from document_in";
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
            const document_in_id = req.params.document_in_id;
            if (!document_in_id) return SendError(res, 400, EMessage.BadRequest, "document_in_id");
            await FindOneDocumentIn(document_in_id);
            const select = "select * from document_in where document_in_id=?";
            connected.query(select, document_in_id, (err, result) => {
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
            const { titile,numberID,part_suppile_id,faculty_id } = req.body;
            if (!titile) {
                return SendError(res, 400, EMessage.BadRequest, "titile")
            }
            const document_in_id = uuidv4();
            const insert = "insert into document_in (document_in_id,titile) values (?,?)";
            connected.query(insert, [document_in_id, titile], (err) => {
                if (err) return SendError(res, 404, EMessage.EInsert, err);
                return SendCreate(res, SMessage.Insert);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
    static async UpdateDocumentIn(req, res) {
        try {
            const document_in_id = req.params.document_in_id;
            if (!document_in_id) return SendError(res, 400, EMessage.BadRequest, "document_in_id");
            await FindOneDocumentIn(document_in_id);
            const { titile } = req.body;
            if (!titile) {
                return SendError(res, 400, EMessage.BadRequest, "titile")
            }
            const update = "update document_in set titile=? where document_in_id=?";
            connected.query(update, [titile, document_in_id], (err) => {
                if (err) return SendError(res, 404, EMessage.EUpdate, err);
                return SendSuccess(res, SMessage.Update);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
    static async DeleteDocumentIn(req, res) {
        try {
            const document_in_id = req.params.document_in_id;
            if (!document_in_id) return SendError(res, 400, EMessage.BadRequest, "document_in_id");
            await FindOneDocumentIn(document_in_id);(document_in_id);
            const deletedocument_in = "Delete from document_in where document_in_id=?";
            connected.query(deletedocument_in, document_in_id, (err) => {
                if (err) return SendError(res, 404, EMessage.EDelete, err);
                return SendSuccess(res, SMessage.Delete);
            })
        } catch (error) {
            return SendError(res, 500, EMessage.ServerInternal, error)
        }
    }
}