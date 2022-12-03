import { Router, Request, Response } from "express";
import { LoginAuthenticateUseCase } from "../module/login/LoginAuthenticateUseCase";

const loginRoutes = Router();

loginRoutes.post("/", async (req: Request, res: Response) =>{
    const { username, password } = req.body;
    
    const loginAuthenticateUseCase = new LoginAuthenticateUseCase();

    const session = await loginAuthenticateUseCase.execute({username, password});

    return res.status(201).json(session);

});

export { loginRoutes };