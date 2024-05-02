import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authenticateToken } from "../middlewares/token.js";
import { upload } from "../middlewares/multer.js";

export const createUserRouter = (userModel) => {
  const userRouter = Router();

  const userController = new UserController(userModel);

  userRouter.post("/register", userController.register);
  userRouter.post("/login", userController.login);
  userRouter.post("/preferences", authenticateToken, userController.updatePreferences);
  userRouter.get("/", authenticateToken, userController.getUser);
  userRouter.post("/updateData", authenticateToken, userController.updateData);
  userRouter.post("/updateEmail", authenticateToken, userController.updateEmail);
  userRouter.post("/updatePassword", authenticateToken, userController.updatePassword);

  return userRouter;
};