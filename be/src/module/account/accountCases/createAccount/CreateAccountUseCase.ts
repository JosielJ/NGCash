import { Account } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { CreateAccountDTO } from "./dtos/CreateAccountDTO";

export class CreateAccountUseCase {
    async execute({username, password}:CreateAccountDTO): Promise<Account> {

        const usernameAlreadyExists = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (usernameAlreadyExists) {
            throw new AppError("Username already used!");
        };

        if (username.length < 3){
            throw new AppError("Username must be at least 3 characters");
        };

        if (password.length < 8){
            throw new AppError("Password must be at least 8 characters");
        };

        const balance = 100.0

        const account = await prisma.account.create({
            data: {
                balance
            }
        });

        return account;
    }
}