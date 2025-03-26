import express from "express";
import {
  CheckAuth,
  CheckUserExist,
  Login,
  LoginWithGoogle,
  Logout,
  Register,
  UpdateAccount,
} from "../controller/auths.controller.js";
import { Middleware } from "../middleware/middleware.js";

export const authRouter = express();

authRouter.post("/signin", Login);

authRouter.post("/signup", Register);

authRouter.post("/signout", Logout);

authRouter.post("/google-login", LoginWithGoogle);

authRouter.put("/update-account", Middleware, UpdateAccount);

authRouter.get("/check-auth", Middleware, CheckAuth);

authRouter.post("/check-user-exist", CheckUserExist);
