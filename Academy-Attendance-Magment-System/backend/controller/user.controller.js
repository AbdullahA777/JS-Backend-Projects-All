// user controller

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../userModels/user.model.js";
import { Student } from "../userModels/student.model.js";
import { Attendance } from "../userModels/attendace.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const signUp = async (req, res) => {
  try {
    const { fullName, email, level, password } = req.body;

    if (
      [fullName, email, level, password].some((field) => field?.trim() === "")
    ) {
      throw new apiError(400, "All fields are required.");
    }

    const existedUser = await User.findOne({
      $or: [{ fullName }, { email }],
    });
    if (existedUser) {
      throw new apiError(400, "Instructor already registerd.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      fullName,
      email,
      level,
      password: hashedPassword
    });

    const createdUser = await User.findById(user._id).select(
      "-password "
    );

    if (!createdUser) {
      throw new apiError(500, "Something went wrong while registering the user");
    }

    return res
      .status(201)
      .json(new apiResponse(201, createdUser, "Instructor registered successfully"));
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
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Check if all fields are provided
    if ([email, password].some((field) => field?.trim() === "")) {
      throw new apiError(400, "All fields are required.");
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(400, "Invalid email or password.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new apiError(400, "Invalid email or password.");
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send response
    return res.status(200).json(new apiResponse(200, { token, user }, "Login successful"));
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


const getInstructors = async (req, res) => {
  
  try {
    const instructors = await User.find();
    res.status(200).send(instructors);
} catch (error) {
    res.status(400).send(error);
}


};

const deleteInstructor  = async (req, res) => {
  
  try {
    const instructor = await User.findByIdAndDelete(req.params.id);
    console.log(instructor);
    if (!instructor) {
        return res.status(404).send();
    }
    res.status(200).send(instructor);
} catch (error) {
    res.status(400).send(error);
}
};

export {
  signUp,
  logIn,
  getInstructors,
  deleteInstructor,
}

