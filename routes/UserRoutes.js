import express from 'express';
import { addGrade } from '../controllers/StudentConroller.js';
import { login, registerTeacher, registerStudent } from '../controllers/loginController.js';
const router = express.Router();
/**
 * @swagger
 * /students/register:
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
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *                          nameClass:
 *                              type: string
 *      responses:
 *          201:
 *              description: created
 */
router.route('/register').post(registerTeacher);
/**
 * @swagger
 * /students/login:
 *  post:
 *      summary: create new teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          Email:
 *                              type: string
 *
 *                          password:
 *                              type: string
 *
 *      responses:
 *          201:
 *              description: created
 */
router.route('/login').post(login);
/**
 * @swagger
 * /students/registerStudent:
 *  post:
 *      summary: login new student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *                          nameClass:
 *                              type: string
 *
 *
 *      responses:
 *          201:
 *              description: created
 */
router.route('/registerStudent').post(registerStudent);
//router.use(authMiddleware)
/**
 * @swagger
 * /students/grades:
 *  post:
 *      summary: create new grade
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_teacher:
 *                              type: string
 *                          id_student:
 *                              type: string
 *                          grade:
 *                              type: number
 *                          subject:
 *                              type: string
 *
 *      responses:
 *          201:
 *              description: created
 */
router.route('/grades').post(addGrade);
//router.use(Is_Teacher);
//router.route('/gradesAverage/:id').get(getAverageOfStudent);
export default router;
