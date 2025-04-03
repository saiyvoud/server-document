import express from "express"
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

export default router;
