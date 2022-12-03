import { LoginAuthenticate } from "./dtos/LoginAuthenticateDTO"; 
import { prisma } from "../../prisma/client"; 
import { AppError } from "../../errors/AppError"; 
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../config/auth";

class LoginAuthenticateUseCase {
    async execute({ username, password }: LoginAuthenticate){

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            throw new AppError("Incorrect Username and/or Password combination!", 404);
        };

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Incorrect Username and/or Password combination!", 404);
        };

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({id: user.id}, secret, {
            expiresIn
        });

        const userData = {
            username: user.username,
            id: user.id,
            accountId: user.accountId
        };

        return { userData, token };

    };
};

export { LoginAuthenticateUseCase };