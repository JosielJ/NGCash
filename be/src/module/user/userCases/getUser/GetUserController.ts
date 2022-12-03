import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController{
    async handle(req: Request, res: Response){
        const {username} = req.body;
        const getUserUseCase = new GetUserUseCase();

        const result = await getUserUseCase.execute({username})

        return res.status(201).json(result);
    };
};