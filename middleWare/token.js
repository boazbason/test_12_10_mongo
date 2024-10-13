var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { Users } from '../models/UserModel.js';
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
const Is_Teacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const allUsers = yield Users.find();
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        if (req.body.role !== "t") {
            next();
        }
        else {
            res.status(401).json({ message: 'Access denied' });
            return;
        }
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
});
export { authMiddleware, Is_Teacher };
