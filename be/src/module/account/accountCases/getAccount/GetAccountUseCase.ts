import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetAccountDTO } from "./dtos/GetAccountDTO";

export class GetAccountUseCase{
    async execute({id}: GetAccountDTO) {
        const account = await prisma.account.findUnique({
            where: {
                id: id
            },
            include:{
                transactionsC: true,
                transactionsD: true
            }
        });

        const accountUser = await prisma.user.findUnique({
            where: {
                accountId: id
            }
        })

        if (!account){
            throw new AppError("Account not found!");
        }

        const accountData = {
            account,
            accountUser
        }

        return accountData;
    }
}