import express from "express";

import {
  createEmployeeSchema,
  getEmployeeByIdSchema,
  updateEmployeeSchema,
} from "../schemas/employeeSchema";
import {
  createEmployeeService,
  getEmployeeByIdService,
  gettAllEmployeesService,
  updateEmployeeService,
} from "../services/employeeServices";

const router = express.Router();

router.get("/", gettAllEmployeesService);

router.get("/:id", getEmployeeByIdSchema, getEmployeeByIdService);

router.post("/", createEmployeeSchema, createEmployeeService);

router.put("/:id", updateEmployeeSchema, updateEmployeeService);

export default router;
