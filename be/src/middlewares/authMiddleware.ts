import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
};

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    if (!authorization){
        throw new AppError("Not authorized", 401);
    };

    const token = authorization.replace("Bearer", "").trim();

    const { secret } = authConfig.jwt;

    try {
        const data = jwt.verify(token, secret);

        const { id } = data as TokenPayload;

        req.userId = id;

        return next();
    } catch {
        throw new AppError("Not authorized", 401);
    };
};