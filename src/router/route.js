import express from "express"
import FacultController from "../controller/faculty.js";
import OfficeController from "../controller/office.js";
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
router.get("/faculty/selOne",auth,FacultController.SelectOne);
router.post("/faculty/insert",auth,FacultController.Insert);
router.put("/faculty/update/:faculty_id",auth,FacultController.UpdateFaculty);
router.delete("/faculty/delete/:faculty_id",auth,FacultController.DeleteFaculty);
//------ Office ------
router.get("/office/selAll",auth,OfficeController.SelectAll);
router.get("/office/selOne",auth,OfficeController.SelectOne);
router.post("/office/insert",auth,OfficeController.Insert);
router.put("/office/update/:office_id",auth,OfficeController.UpdateOffice);
router.delete("/office/delete/:office_id",auth,OfficeController.DeleteOffice);
export default router;
    