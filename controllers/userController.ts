import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/db.config";
const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null // Use the generic T here
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({});
    return handleResponse(res, 200, "All Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      return handleResponse(
        res,
        400,
        "Email Already Taken. Please try another email."
      );
    }
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return handleResponse(res, 201, "User created successfully", newUser);
  } catch(error) {
    next(error);
  }
};
