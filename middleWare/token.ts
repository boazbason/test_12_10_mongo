import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {Users, IUser} from '../models/UserModel.js';


export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const Is_Teacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.token;
    const allUsers: IUser[] = await Users.find();
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        if (req.body.role !== "t") {
            next();
        } else {
            res.status(401).json({ message: 'Access denied' });
            return
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

export { authMiddleware, Is_Teacher };