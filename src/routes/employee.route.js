import express from "express";
import { EmployeeController } from "../controllers/employee.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";
const router = express.Router();

//router.use(verifyToken);

router.get("/", verifyToken,EmployeeController.getAllEmployees);
router.get("/:id",verifyToken, EmployeeController.getEmployeeById);
//router.get("/email/:email", EmployeeController.getEmployeeByEmail);
router.post("/",verifyToken ,EmployeeController.createEmployee);
router.put("/:id",verifyToken ,EmployeeController.updateEmployee);
router.delete("/:id",verifyToken, EmployeeController.deleteEmployee);

export default router;
