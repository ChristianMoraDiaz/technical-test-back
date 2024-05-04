import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { prismaDB } from "../db";

export const gettAllEmployeesService = async (_req: Request, res: Response) => {
  console.log("HOLA");
  try {
    const response = await prismaDB.employee.findMany({
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
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEmployeeByIdService = async (req: Request, res: Response) => {
  const params = +req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await prismaDB.employee.findFirst({
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
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createEmployeeService = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await prismaDB.employee.create({
      data: {
        ...req.body,
      },
    });

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error in the creation process");
  }
};

export const updateEmployeeService = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const employeeId = +req.params.id;

  try {
    const existingEmployee = await prismaDB.employee.findFirst({
      where: {
        id: employeeId,
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (
      req.body.supervisorId &&
      req.body.supervisorId !== existingEmployee.supervisorId
    ) {
      req.body.version = existingEmployee.version + 1;

      await prismaDB.employee.update({
        where: {
          id: req.body.supervisorId,
        },
        data: {
          director: true,
        },
      });
    }

    const updatedEmployee = await prismaDB.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        ...existingEmployee,
        ...req.body,
      },
    });

    const subordinatesCount = await prismaDB.employee.count({
      where: {
        supervisorId: existingEmployee.supervisorId,
      },
    });

    if (existingEmployee.supervisorId && subordinatesCount === 0) {
      await prismaDB.employee.update({
        where: {
          id: existingEmployee.supervisorId,
        },
        data: {
          director: false,
        },
      });
    }

    return res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in the update process" });
  }
};
