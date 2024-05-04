"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeService = exports.createEmployeeService = exports.getEmployeeByIdService = exports.gettAllEmployeesService = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../db");
const gettAllEmployeesService = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.prismaDB.employee.findMany({
            select: {
                id: true,
                name: true,
                supervisor: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                subordinates: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                version: true,
                director: true,
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.gettAllEmployeesService = gettAllEmployeesService;
const getEmployeeByIdService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = +req.params.id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const response = yield db_1.prismaDB.employee.findFirst({
            where: {
                id: params,
            },
            select: {
                id: true,
                name: true,
                supervisor: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                subordinates: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                version: true,
                director: true,
            },
        });
        if (response) {
            return res.status(200).json(response);
        }
        return res.status(404).json({ error: "Employee not found" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getEmployeeByIdService = getEmployeeByIdService;
const createEmployeeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const response = yield db_1.prismaDB.employee.create({
            data: Object.assign({}, req.body),
        });
        return res.json(response);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("Error in the creation process");
    }
});
exports.createEmployeeService = createEmployeeService;
const updateEmployeeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const employeeId = +req.params.id;
    try {
        const existingEmployee = yield db_1.prismaDB.employee.findFirst({
            where: {
                id: employeeId,
            },
        });
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        if (req.body.supervisorId &&
            req.body.supervisorId !== existingEmployee.supervisorId) {
            req.body.version = existingEmployee.version + 1;
            yield db_1.prismaDB.employee.update({
                where: {
                    id: req.body.supervisorId,
                },
                data: {
                    director: true,
                },
            });
        }
        const updatedEmployee = yield db_1.prismaDB.employee.update({
            where: {
                id: employeeId,
            },
            data: Object.assign(Object.assign({}, existingEmployee), req.body),
        });
        const subordinatesCount = yield db_1.prismaDB.employee.count({
            where: {
                supervisorId: existingEmployee.supervisorId,
            },
        });
        if (existingEmployee.supervisorId && subordinatesCount === 0) {
            yield db_1.prismaDB.employee.update({
                where: {
                    id: existingEmployee.supervisorId,
                },
                data: {
                    director: false,
                },
            });
        }
        return res.json(updatedEmployee);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in the update process" });
    }
});
exports.updateEmployeeService = updateEmployeeService;
