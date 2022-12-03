import { Router } from "express";
import { loginRoutes } from "./login.routes";
import { registerRoutes } from "./register.routes";
import { transactionRoutes } from "./transaction.routes";
import { getuserRoutes } from "./getuser.routes";
import { getaccountRoutes } from "./getaccount.routes"
import authMiddleware from "../middlewares/authMiddleware";
import { createDepositRoutes } from "./deposit.routes";

const routes = Router();

routes.use("/register", registerRoutes);
routes.use("/login", loginRoutes);

routes.use("/transaction", authMiddleware, transactionRoutes);
routes.use("/id", authMiddleware, getuserRoutes);
routes.use("/accountid", authMiddleware, getaccountRoutes);
routes.use("/deposit", authMiddleware, createDepositRoutes);

export { routes };