import express from "express"
import FacultController from "../controller/faculty.js";
import OfficeController from "../controller/office.js";
import PartDemandController from "../controller/partDemand.js";
import PartSuppileController from "../controller/partSuppile.js";
import DocumentInController from "../controller/documentIn.js";
import DocumentOutController from "../controller/documentOut.js";
import PermissionController from "../controller/permmision.js";
import PermissionRoleController from "../controller/permmision_role.js";
import RoleController from "../controller/role.js";
import RoleUserController from "../controller/roleUser.js";
import UserController from "../controller/user.js";
import { auth, authAdmin, checkPermission } from "../middleware/auth.js";
const router = express.Router();
// --- User ----
router.post("/user/register", UserController.Register);
router.post("/user/login", UserController.Login);
// ---- Role -----
router.get("/role/selAll", RoleController.SelectAll);
router.post("/role/insert", RoleController.Insert);
// ----- Role user ----
router.post("/role_user/insert", RoleUserController.Insert)
router.get("/role_user/selAll", auth, RoleUserController.SelectAll)
// ----- Permission ----
router.post("/permission/insert", PermissionController.Insert)
router.get("/permission/selAll", auth,authAdmin,checkPermission, PermissionController.SelectAll)
// ----- Permission Role ----
router.post("/permission_role/insert", PermissionRoleController.Insert)
router.get("/permission_role/selAll", auth, PermissionRoleController.SelectAll)
//------ Faculty ------
router.get("/faculty/selAll",auth,FacultController.SelectAll);
router.get("/faculty/selOne/:faculty_id",auth,FacultController.SelectOne);
router.post("/faculty/insert",auth,FacultController.Insert);
router.put("/faculty/update/:faculty_id",auth,FacultController.UpdateFaculty);
router.delete("/faculty/delete/:faculty_id",auth,FacultController.DeleteFaculty);
//------ Office ------
router.get("/office/selAll",auth,OfficeController.SelectAll);
router.get("/office/selOne/:office_id",auth,OfficeController.SelectOne);
router.post("/office/insert",auth,OfficeController.Insert);
router.put("/office/update/:office_id",auth,OfficeController.UpdateOffice);
router.delete("/office/delete/:office_id",auth,OfficeController.DeleteOffice);
//------ Part Demand ------
router.get("/part_demand/selAll",auth,PartDemandController.SelectAll);
router.get("/part_demand/selOne/:part_demand_id",auth,PartDemandController.SelectOne);
router.post("/part_demand/insert",auth,PartDemandController.Insert);
router.put("/part_demand/update/:part_demand_id",auth,PartDemandController.UpdatePartDemand);
router.delete("/part_demand/delete/:part_demand_id",auth,PartDemandController.DeletePartDemend);
//------ Part Suppile ------
router.get("/part_suppile/selAll",auth,PartSuppileController.SelectAll);
router.get("/part_suppile/selOne",auth,PartSuppileController.SelectOne);
router.post("/part_suppile/insert",auth,PartSuppileController.Insert);
router.put("/part_suppile/update/:part_suppile_id",auth,PartSuppileController.UpdatePartSuppile);
router.delete("/part_suppile/delete/:part_suppile_id",auth,PartSuppileController.DeletePartSuppile);
//------ Document In ------
router.get("/document_in/selAll",auth,DocumentInController.Search);
router.get("/document_in/selAll",auth,DocumentInController.SelectAll);
router.get("/document_in/selOne",auth,DocumentInController.SelectOne);
router.post("/document_in/insert",auth,DocumentInController.Insert);
router.put("/document_in/update/:document_in_id",auth,DocumentInController.UpdateDocumentIn);
router.put("/document_in/updateStatus/:document_in_id",auth,DocumentInController.UpdateStatus);
router.delete("/document_in/delete/:document_in_id",auth,DocumentInController.DeleteDocumentIn);
//------ Document Out ------
router.get("/document_in/selAll",auth,DocumentOutController.Search);
router.get("/document_in/selAll",auth,DocumentOutController.SelectAll);
router.get("/document_in/selOne",auth,DocumentOutController.SelectOne);
router.post("/document_in/insert",auth,DocumentOutController.Insert);
router.put("/document_in/updateStatus/:document_in_id",auth,DocumentOutController.UpdateStatus);
router.delete("/document_in/delete/:document_in_id",auth,DocumentOutController.DeleteDocumentOut);
export default router;
    