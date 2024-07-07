import { Router } from "express";
import { addStudent, getStudents, deleteStudent } from "../controller/student.controller.js";
import { submitAttendance, showAllAttendance, showLast30DaysAttendance } from "../controller/attendance.controller.js"
import { deleteInstructor, getInstructors, logIn, signUp } from "../controller/user.controller.js";

const router = Router()


router.route("/signup").post(signUp)
router.route("/login").post(logIn)
router.route("/submitAttendance").post(submitAttendance)
router.route("/addStudent").post(addStudent)
router.route("/students").get(getStudents)
router.route("/deleteStudent/:id").delete(deleteStudent)
router.route("/instructors").get(getInstructors)
router.route("/showTodayAttendance").get(showAllAttendance)
router.route("/showLast30DaysAttendance").get(showLast30DaysAttendance)
router.route("/deleteInstructor/:id").delete(deleteInstructor)


export default router;