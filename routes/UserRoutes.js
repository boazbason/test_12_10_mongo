import express from 'express';
import { getAllStudents, createStudent, getAllTeachers, getStudentById, addGrade, getGradeById, getAverageOfStudent } from '../controllers/StudentConroller.js';
import { login } from '../controllers/loginController.js';
const router = express.Router();
/**
 * @swagger
 * /students/login:
 *  post:
 *      summary: Retrive the list
 *      responses:
 *          200:
 *              description: A JSON ARRAY of students
 */
/**
 * @swagger
 * /students/:
 *  get:
 *      summary: Retrive the list
 *      responses:
 *          200:
 *              description: A JSON ARRAY of students
 */
/**
 * @swagger
 * /teacher/register:
 *  post:
 *      summary: create new teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          passportId:
 *                              type: number
 *                          role:
 *                              type: string
 *                          password:
 *                              type: string
 *                          grades:
 *                              type: array
 *      responses:
 *          201:
 *              description: created
 */
router.route('/login').post(login);
//router.use(authMiddleware)
router.route('/').get(getAllStudents).post(createStudent);
router.route('/:id').get(getStudentById);
router.route('/teachers').get(getAllTeachers);
router.route('/grades/:id').get(getGradeById).post(addGrade);
//router.use(Is_Teacher);
router.route('/gradesAverage/:id').get(getAverageOfStudent);
export default router;
