import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {Users, IUser} from '../models/UserModel.js';
import { JWT_SECRET } from '../middleWare/token.js';
import {classRoomModel, IClass} from '../models/classRoomModel.js';
//import bcrypt from 'bcryptjs';


export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
    console.log("in register teacher");
    
    try {
        
        const {fullName, password,  email, nameClass} = req.body;
        const newUser: any = {
            
            fullName: fullName,
            password: password, //bcrypt.hashSync(password, 10),
            email: email,
            role: "teacher"          
        }
        if (!newUser) {
            res.status(400).json({ message: 'No user data provided' });
            return;
        }
        
        const existingUser = await Users.create(newUser);
        
        const newClass = new classRoomModel({
            teacher: existingUser._id,
            name: nameClass
        });
        
        await newClass.save();
        
        await existingUser.save();

        res.status(201).json({success: true, id_class:newClass.id});
    } catch (error) {
        res.status(400).json({ message: `Error creating user ${error}` });
    }
    
}

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {fullName, password,  email, nameClass} = req.body;
        const newStudent: any = {
            
            fullName: fullName,
            password: password,
            email: email,
            role: "student",
            grades: []
        }
        if (!newStudent) {
            res.status(400).json({ message: 'No user data provided' , success: false});
            return;
        }

        const existingUser = await Users.create(newStudent);
        await existingUser.save();
        try {
            const nameClassFind = await classRoomModel.find({name:nameClass});

            nameClassFind[0].students.push(existingUser._id);
            await nameClassFind[0].save();

        } catch{
            res.status(400).json({ message: "name class not found", success: false });
            return;
        }

        res.status(201).json({ message: 'User created successfully', Id_student: existingUser._id, success: true});
    } catch (error) {
        res.status(400).json({ message: `Error creating user ${error}` });
    }
}


export const login = async (req: Request, res: Response): Promise<void> => {
    const { Email, password } = req.body;
    console.log("in login");
        
    try {
        const user = await Users.findOne({ email: Email });

        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
            return; 
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // שים את הטוקן בקוקי
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000, 
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: "Error logging in" });
    }
}