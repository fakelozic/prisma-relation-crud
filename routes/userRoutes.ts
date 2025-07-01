import express from "express";
import {
  getAllUsers,
  // createUser,
  // updateUser,
  // getUserById,
  // deleteUser,
} from "../controllers/userController";

const router = express.Router();

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/").get(getAllUsers);

export default router;
