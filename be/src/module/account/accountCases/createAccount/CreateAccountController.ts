import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../user/userCases/createUser/CreateUserUseCase";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
    async handle(req: Request, res: Response){
        const {username, password} = req.body;

        const createAccountUseCase = new CreateAccountUseCase();

        const resultAccount = await createAccountUseCase.execute({username, password});

        const accountId = resultAccount.id

        const createUserUseCase = new CreateUserUseCase();
        
        const resultUser = await createUserUseCase.execute({username, password, accountId})

        return res.status(201).json([resultUser, resultAccount]);
    };
};