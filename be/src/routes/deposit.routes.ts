import { Router } from "express";
import { CreateDepositController } from "../module/deposit/depositCases/createDeposit/CreateDepositController";


const createDepositController = new CreateDepositController();

const createDepositRoutes = Router();

createDepositRoutes.post("/", createDepositController.handle);

export {createDepositRoutes};