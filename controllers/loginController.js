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
import { Users } from '../models/UserModel';
import { JWT_SECRET } from '../middleWare/token.js';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        if (!newUser) {
            res.status(400).json({ message: 'No user data provided' });
            return;
        }
        if (newUser.role == "t") { }
        const existingUser = yield Users.create(newUser);
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(400).json({ message: `Error creating user ${error}` });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passportId, password } = req.body;
    console.log("in login");
    try {
        const user = yield Users.findOne({ passportId });
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        // שים את הטוקן בקוקי
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(400).json({ message: "Error logging in" });
    }
});
