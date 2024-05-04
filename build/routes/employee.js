"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeSchema_1 = require("../schemas/employeeSchema");
const employeeServices_1 = require("../services/employeeServices");
const router = express_1.default.Router();
router.get("/", employeeServices_1.gettAllEmployeesService);
router.get("/:id", employeeSchema_1.getEmployeeByIdSchema, employeeServices_1.getEmployeeByIdService);
router.post("/", employeeSchema_1.createEmployeeSchema, employeeServices_1.createEmployeeService);
router.put("/:id", employeeSchema_1.updateEmployeeSchema, employeeServices_1.updateEmployeeService);
exports.default = router;
