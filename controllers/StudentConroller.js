var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Users } from '../models/UserModel';
import mongoose from 'mongoose';
export const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStudent = yield Users.find({ role: "s" });
        res.status(200).json({ data: allStudent, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "cant get", success: false });
    }
});
export const getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTeachers = yield Users.find({ role: "t" });
        res.status(200).json({ data: allTeachers, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "cant get", success: false });
    }
});
export const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudent = req.body;
        newStudent.grades = [];

        const studentAdded = yield Users.create(newStudent);
        res.status(201).json({ data: studentAdded, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const student = yield Users.findById(id);
        if (!student) {
            res.status(400).json({ message: "student not found", success: false });
            return;
        }
        res.status(200).json({ data: student, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const student = yield Users.findById(id);
        if (!student) {
            res.status(400).json({ message: "student not found", success: false });
            return;
        }
        const newGrade = req.body;
        student.grades.push(newGrade);
        yield student.save();
        res.status(200).json({ data: student, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const getGradeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const student = yield Users.findById(id);
        if (!student) {
            res.status(400).json({ message: "student not found", success: false });
            return;
        }
        res.status(200).json({ data: student.grades, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const getAverageOfStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const gradeOfStudent = yield Users.aggregate([
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
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const deleteGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const student = yield Users.findById(id);
        if (!student) {
            res.status(400).json({ message: "student not found", success: false });
            return;
        }
        student.grades = student.grades.filter(grade => grade._id !== req.body.grade);
        yield student.save();
        res.status(200).json({ data: student, success: true });
    }
    catch (error) {
        res.status(400).json({ massage: error, success: false });
    }
});
