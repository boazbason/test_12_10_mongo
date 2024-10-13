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
import { JWT_SECRET } from '../middleWare/token.js';
import { classRoomModel } from '../models/classRoomModel.js';
//import bcrypt from 'bcryptjs';
export const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in register teacher");
    try {
        const { fullName, password, email, nameClass } = req.body;
        const newUser = {
            fullName: fullName,
            password: password, //bcrypt.hashSync(password, 10),
            email: email,
            role: "teacher"
        };
        if (!newUser) {
            res.status(400).json({ message: 'No user data provided' });
            return;
        }
        const existingUser = yield Users.create(newUser);
        const newClass = new classRoomModel({
            teacher: existingUser._id,
            name: nameClass
        });
        yield newClass.save();
        yield existingUser.save();
        res.status(201).json({ success: true, id_class: newClass.id });
    }
    catch (error) {
        res.status(400).json({ message: `Error creating user ${error}` });
    }
});
export const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, password, email, nameClass } = req.body;
        const newStudent = {
            fullName: fullName,
            password: password,
            email: email,
            role: "student",
            grades: []
        };
        if (!newStudent) {
            res.status(400).json({ message: 'No user data provided', success: false });
            return;
        }
        const existingUser = yield Users.create(newStudent);
        yield existingUser.save();
        try {
            const nameClassFind = yield classRoomModel.find({ name: nameClass });
            nameClassFind[0].students.push(existingUser._id);
            yield nameClassFind[0].save();
        }
        catch (_a) {
            res.status(400).json({ message: "name class not found", success: false });
            return;
        }
        res.status(201).json({ message: 'User created successfully', Id_student: existingUser._id, success: true });
    }
    catch (error) {
        res.status(400).json({ message: `Error creating user ${error}` });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, password } = req.body;
    console.log("in login");
    try {
        const user = yield Users.findOne({ email: Email });
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
