import express from "express";
import { edit,remove,see,logout } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("logout", logout)
userRouter.get(":id", see);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

export default userRouter;