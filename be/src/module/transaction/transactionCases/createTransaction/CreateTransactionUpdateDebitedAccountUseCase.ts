import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateTransactionDTO } from "./dtos/CreateTransactionDTO";

export class UpdateTransactionDebitedUseCase {
    
    async execute({debitedAccountId, creditedAccountId, value}:CreateTransactionDTO){

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
                throw new AppError("Insufficient account balance!");
            }
        }

        const debitedAccountNewCurrentBalance = debitedAccountCurrentBalance - value

        const updateDebitedAccount = await prisma.account.update({ 
            where: {id: debitedAccountId}, 
            data: {balance: debitedAccountNewCurrentBalance}
        });

        return updateDebitedAccount;
    };
};