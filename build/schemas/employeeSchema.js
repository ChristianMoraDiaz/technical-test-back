"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.getEmployeeByIdSchema = exports.createEmployeeSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createEmployeeSchema = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("supervisorId")
        .optional({ nullable: true })
        .isInt({ allow_leading_zeroes: false })
        .withMessage("SupervisorId must be an integer"),
    (0, express_validator_1.body)("director")
        .optional()
        .isBoolean()
        .withMessage("Director must be a boolean value"),
];
exports.getEmployeeByIdSchema = [
    (0, express_validator_1.param)("id").isInt().withMessage("Id must be an integer").notEmpty(),
];
exports.updateEmployeeSchema = [
    (0, express_validator_1.param)("id")
        .isInt()
        .withMessage("Employee ID must be an integer")
        .notEmpty()
        .withMessage("Employee ID is required"),
    (0, express_validator_1.body)("name").optional().isString().withMessage("Name must be a string"),
    (0, express_validator_1.body)("version")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Version must be a positive integer"),
    (0, express_validator_1.body)("supervisorId")
        .optional()
        .isInt()
        .withMessage("Supervisor ID must be an integer"),
    (0, express_validator_1.body)("director")
        .optional()
        .isBoolean()
        .withMessage("Director must be a boolean value"),
];
