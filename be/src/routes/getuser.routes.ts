import { Router } from "express";
import { GetUserController } from "../module/user/userCases/getUser/GetUserController";


const getUserController = new GetUserController();

const getuserRoutes = Router();

getuserRoutes.post("/", getUserController.handle);

export {getuserRoutes};