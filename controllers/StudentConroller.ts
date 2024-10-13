import {Users, IUser} from '../models/UserModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';


export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const allStudent = await Users.find({role: "s"});
        res.status(200).json({ data: allStudent, success: true })
    }
    catch (error) {
        res.status(400).json({ message: "cant get", success: false })
    }
};

export const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const allTeachers = await Users.find({role: "t"});
        res.status(200).json({ data: allTeachers, success: true })
    }
    catch (error) {
        res.status(400).json({ message: "cant get", success: false })
    }
};

export const createStudent = async(req: Request, res: Response)=>{
    try{
        const newStudent = req.body;
        newStudent.grades = [];

        const studentAdded = await Users.create(newStudent);
        res.status(201).json({ data: studentAdded, success: true })

    }
    catch(error){
        res.status(400).json({ message: error, success: false })
    }
};

export const getStudentById = async(req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const student = await Users.findById(id);
        if(!student){
            res.status(400).json({message: "student not found", success: false});
            return
        }
        res.status(200).json({data: student, success: true})
    }
    catch(error){
        res.status(400).json({message: error, success: false})
    }
};

export const addGrade = async(req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const student = await Users.findById(id);
        if(!student){
            res.status(400).json({message: "student not found", success: false});
            return
        }
        const newGrade = req.body;
        student.grades.push(newGrade);
        await student.save();
        res.status(200).json({data: student, success: true})
    }
    catch(error){
        res.status(400).json({message: error, success: false})
    }
};

export const getGradeById = async(req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const student = await Users.findById(id);
        if(!student){
            res.status(400).json({message: "student not found", success: false});
            return
        }
        res.status(200).json({data: student.grades, success: true})
    }
    catch(error){
        res.status(400).json({message: error, success: false})
    }
};

export const getAverageOfStudent = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const gradeOfStudent = await Users.aggregate([
            {
              $match: { _id: new mongoose.Types.ObjectId(id) } // סינון לפי ה-ID של המשתמש
            },
            {
              $unwind: "$grades" // מפרק את הציונים
            },
            {
              $group: {
                _id: "$_id", // קיבוץ לפי ה-ID של המשתמש
                averageGrade: { $avg: "$grades.grade" } // חישוב ממוצע הציונים
              }
            }
        ]);
        res.status(200).json({ data: gradeOfStudent, success: true });
    }
    catch(error) {
        res.status(400).json({ message: error, success: false });
    }
};

export const deleteGrade = async(req: Request, res: Response)=>{
    try{
        const id = req.params.id;
        const student = await Users.findById(id);
        if(!student){
            res.status(400).json({message: "student not found", success: false});
            return
        }
        student.grades = student.grades.filter(grade => grade._id !== req.body.grade);
        await student.save();
        res.status(200).json({data: student, success: true})
    }
    catch(error){
        res.status(400).json({massage: error, success: false})
    }
}