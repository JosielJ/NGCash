import { Router } from "express";
import { CreateAccountController } from "../module/account/accountCases/createAccount/CreateAccountController";

const createAccountUseCase = new CreateAccountController();

const registerRoutes = Router();

registerRoutes.post("/", createAccountUseCase.handle);

export {registerRoutes};