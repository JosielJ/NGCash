import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { CreateDepositDTO } from "./dtos/CreateDepositDTO";

export class CreateDepositUseCase {
    async execute({id, value}:CreateDepositDTO)  {

        const findAccount = await prisma.account.findUnique({
            where: { id }, 
        });

        if (!findAccount) {
            throw new AppError("Account not found!");
        };

        const currentBalance = findAccount.balance + value

        const updateAccountBalance = await prisma.account.update({ 
            where: {id }, 
            data: {balance: currentBalance}
        });

        return updateAccountBalance;
    }
}