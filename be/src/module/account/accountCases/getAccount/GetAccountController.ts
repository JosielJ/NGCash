import { Request, Response } from "express";
import { GetAccountUseCase } from "./GetAccountUseCase";

export class GetAccountController{
    async handle(req: Request, res: Response){
        const {id} = req.body;
        const getUserUseCase = new GetAccountUseCase();

        const result = await getUserUseCase.execute({id})

        return res.status(201).json(result);
    }
}