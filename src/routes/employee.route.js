import express from "express";
import { EmployeeController } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
//router.get("/email/:email", EmployeeController.getEmployeeByEmail);
router.post("/", EmployeeController.createEmployee);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
