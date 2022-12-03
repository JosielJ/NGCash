import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(req: Request, res: Response){
        const {username, password, accountId} = req.body;

        const createUserUseCase = new CreateUserUseCase();

        const result = await createUserUseCase.execute({username, password, accountId});

        return res.status(201).json(result);
    };
};