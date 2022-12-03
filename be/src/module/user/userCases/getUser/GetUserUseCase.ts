import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";
import { GetUserDTO } from "./dtos/GetUserDTO";

export class GetUserUseCase{
    async execute({username}: GetUserDTO){

        const user = await prisma.user.findUnique({
            where:{
                username
            }
        });

        if (!user) {
            throw new AppError("User not found!");
        };

        return user
    };
};