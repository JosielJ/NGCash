import { Request, Response } from "express";
import { UpdateTransactionCreditedUseCase } from "./CreateTransactionUpdateCreditedAccountUseCase";
import { UpdateTransactionDebitedUseCase } from "./CreateTransactionUpdateDebitedAccountUseCase";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionController {
    async handle(req: Request, res: Response){
        const {debitedAccountId, creditedAccountId, value} = req.body;

        const createTransactionDTO = new CreateTransactionUseCase();
        
        const resultTransaction = await createTransactionDTO.execute({debitedAccountId, creditedAccountId, value});

        const updateTransactionDebitedUseCase = new UpdateTransactionDebitedUseCase();

        const resultDebitedUpdade = await updateTransactionDebitedUseCase.execute({debitedAccountId, creditedAccountId, value});

        const updateTransactionCreditedUseCase = new UpdateTransactionCreditedUseCase();

        const resultCreditedUpdade = await updateTransactionCreditedUseCase.execute({debitedAccountId, creditedAccountId, value});

        return res.status(201).json([resultTransaction]);
    };
};