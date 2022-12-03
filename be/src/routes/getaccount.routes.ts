import { Router } from "express";
import { GetAccountController } from "../module/account/accountCases/getAccount/GetAccountController";


const getAccountController = new GetAccountController();

const getaccountRoutes = Router();

getaccountRoutes.post("/", getAccountController.handle);

export {getaccountRoutes};