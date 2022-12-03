import { User } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { hash } from "bcryptjs";

export class CreateUserUseCase {
    async execute({username, password, accountId}:CreateUserDTO): Promise<User> {
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

        const hashedPassword = await hash(password, 4);

        const accountIdExists = await prisma.account.findUnique({
            where: {
                id: accountId
            }
        });

        if (!accountIdExists){
            throw new AppError("Error to create an account!");
        }

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                accountId
            }
        });

        return user;
    };
};