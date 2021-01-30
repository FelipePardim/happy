import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require("dotenv");

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send("Missing authorization.")
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, jwtSecret);
        const { id } = data as TokenPayload;
        req.userId = id;
        return next();
    } catch {
        return res.status(401).send("Invalid JWT Token.")
    }

}