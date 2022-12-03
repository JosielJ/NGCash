import { Transaction } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateTransactionDTO } from "./dtos/CreateTransactionDTO";

export class CreateTransactionUseCase {
    
    async execute({debitedAccountId, creditedAccountId, value}:CreateTransactionDTO): Promise<Transaction> {

        const debitedAccountExists = await prisma.account.findUnique({
            where: {
                id: debitedAccountId
            }
        });

        const creditedAccountExists = await prisma.account.findUnique({
            where: {
                id: creditedAccountId
            }
        });

        if (!debitedAccountExists) {
            throw new AppError("Debited Account doesn't exist!");
        };

        if (!creditedAccountExists) {
            throw new AppError("Credited Account doesn't exist!");
        };

        if (debitedAccountId === creditedAccountId) {
            throw new AppError("Unable to transfer to own account!");
            
        };

        const debitedAccount = await prisma.account.findUnique({
            where: { id: debitedAccountId },
            select: {
                balance: true
            }
        });

        const debitedAccountCurrentBalance = debitedAccount?.balance

        if (typeof debitedAccountCurrentBalance != "number"){
            throw new AppError("Error when checking debited account balance!");
        };

        if (typeof debitedAccountCurrentBalance === "number"){
            if (value > debitedAccountCurrentBalance){
                throw new AppError("Insufficient debited account balance!");
            }
        };

        const transaction = await prisma.transaction.create({
            data: {
                debitedAccountId,
                creditedAccountId,
                value
            }
        });

        return transaction;
    };
};