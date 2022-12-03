import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateTransactionDTO } from "./dtos/CreateTransactionDTO";

export class UpdateTransactionCreditedUseCase {
    
    async execute({debitedAccountId, creditedAccountId, value}:CreateTransactionDTO){

        const creditedAccount = await prisma.account.findUnique({
            where: { id: creditedAccountId },
            select: {
                balance: true
            }
        });

        const creditedAccountCurrentBalance = creditedAccount?.balance

        if (typeof creditedAccountCurrentBalance != "number"){
            throw new AppError("Error when checking credited account balance!");
        };

        const creditedAccountNewCurrentBalance = creditedAccountCurrentBalance + value

        const updateCreditedAccount = await prisma.account.update({ 
            where: {id: creditedAccountId}, 
            data: {balance: creditedAccountNewCurrentBalance}
        });

        return updateCreditedAccount;
    }
}