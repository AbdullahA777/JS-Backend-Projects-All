import { Student } from "../userModels/student.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const addStudent = async (req, res) => {
    try {
      const { name, userId} = req.body;
      console.log(name, userId);
      if (
        [name, userId].some((field) => field?.trim() === "")
      ) {
        throw new apiError(400, "All fields are required.");
      }
  
      // Create new user
      const user = await Student.create({
        name,
        userId
      });
  
      if (!user) {
        throw new apiError(500, "Something went wrong while registering the student");
      }
  
      return res
        .status(201)
        .json(new apiResponse(201, user, "Student registered successfully"));
    } catch (error) {
      if (error instanceof apiError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          errors: error.errors
        });
      }
  
      // If it's an unexpected error, log it and send a generic error response
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: []
      });
    }
  
  
  }
  
  const getStudents = async (req, res) => {
    
    try {
      const students = await Student.find();
      res.status(200).send(students);
  } catch (error) {
      res.status(400).send(error);
  }
  
  
  };
  const deleteStudent  = async (req, res) => {
    
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
          return res.status(404).send();
      }
      res.status(200).send(student);
  } catch (error) {
      res.status(400).send(error);
  }
  };


  export {
    addStudent,
    getStudents,
    deleteStudent
  }
  