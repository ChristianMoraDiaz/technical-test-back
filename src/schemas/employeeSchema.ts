import { body, param } from "express-validator";

export const createEmployeeSchema = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("supervisorId")
    .optional({ nullable: true })
    .isInt({ allow_leading_zeroes: false })
    .withMessage("SupervisorId must be an integer"),
  body("director")
    .optional()
    .isBoolean()
    .withMessage("Director must be a boolean value"),
];

export const getEmployeeByIdSchema = [
  param("id").isInt().withMessage("Id must be an integer").notEmpty(),
];

export const updateEmployeeSchema = [
  param("id")
    .isInt()
    .withMessage("Employee ID must be an integer")
    .notEmpty()
    .withMessage("Employee ID is required"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("version")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Version must be a positive integer"),
  body("supervisorId")
    .optional()
    .isInt()
    .withMessage("Supervisor ID must be an integer"),
  body("director")
    .optional()
    .isBoolean()
    .withMessage("Director must be a boolean value"),
];
