import { Request, Response } from "express";
import { CreateDepositUseCase } from "./CreateDepositUseCase";

export class CreateDepositController{
    async handle(req: Request, res: Response){
        const {id, value} = req.body;
        const createDepositUseCase = new CreateDepositUseCase();

        const result = await createDepositUseCase.execute({id, value})

        return res.status(201).json(result);
    }
}