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
    const { name, email, password, age, isMarried, nationality } = req.body;
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
        name,
        email,
        password,
        age,
        isMarried,
        nationality,
      },
    });
    return handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return handleResponse(res, 400, "User you are looking for is not found");
  }
  return handleResponse(res, 201, "User fetched successfully", user);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id);
  const { name, email, password, age, isMarried, nationality } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return handleResponse(res, 400, "User you are looking for is not found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      password,
      age,
      isMarried,
      nationality,
    },
  });
  return handleResponse(res, 201, "User updated successfully", updatedUser);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return handleResponse(res, 400, "User you are looking for is not found");
  }
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return handleResponse(res, 201, "User deleted successfully", deletedUser);
};
