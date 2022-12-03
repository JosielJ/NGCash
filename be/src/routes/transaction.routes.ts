import { Router } from "express";
import { CreateTransactionController } from "../module/transaction/transactionCases/createTransaction/CreateTransactionController";

const createTransactionUseCase = new CreateTransactionController();

const transactionRoutes = Router();

transactionRoutes.post("/", createTransactionUseCase.handle);

export {transactionRoutes};