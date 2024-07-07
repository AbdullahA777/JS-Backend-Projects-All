import { Attendance } from "../userModels/attendace.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// Function to handle attendance submission
const submitAttendance = async (req, res) => {
   
    try {
      const { insName, level, students } = req.body;
      console.log(insName, level, students);
   
       
   
       
       // Create new user
       const user = await Attendance.create({
         insName,
         level,
         students
       });
   
       
   
       if (!user) {
         throw new apiError(500, "Something went wrong while submiting attendance ");
       }
      console.log(user);
       return res
         .status(201)
         .json(new apiResponse(201, user, "Attendance submit successfully"));
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
 
 const showAllAttendance = async (req, res) => {
   try {
     // Get today's date in the format YYYY-MM-DD
     const todayStart = new Date();
     todayStart.setHours(0, 0, 0, 0);
 
     const todayEnd = new Date();
     todayEnd.setHours(23, 59, 59, 999);
 
     // Fetch all attendance records for today from the database
     const attendanceRecords = await Attendance.find({
       createdAt: {
         $gte: todayStart,
         $lte: todayEnd
       }
     });
 
     // If no records are found, throw an error
     if (!attendanceRecords || attendanceRecords.length === 0) {
       throw new apiError(404, "No attendance records found for today");
     }
 
     // Return the attendance records in the response
     return res.status(200).json(new apiResponse(200, attendanceRecords, "Today's attendance records retrieved successfully"));
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
 
 // last 30 days 
 const showLast30DaysAttendance = async (req, res) => {
   try {
     // Get the date 30 days ago
     const today = new Date();
     const thirtyDaysAgo = new Date(today);
     thirtyDaysAgo.setDate(today.getDate() - 30);
 
     // Fetch all attendance records from the last 30 days from the database
     const attendanceRecords = await Attendance.find({
       createdAt: {
         $gte: thirtyDaysAgo,
         $lte: today
       }
     });
 
     // If no records are found, throw an error
     if (!attendanceRecords || attendanceRecords.length === 0) {
       throw new apiError(404, "No attendance records found for the last 30 days");
     }
 
     // Group records by instructor name
     const groupedRecords = attendanceRecords.reduce((acc, record) => {
       if (!acc[record.insName]) {
         acc[record.insName] = [];
       }
       acc[record.insName].push(record);
       return acc;
     }, {});
 
     // Return the grouped records in the response
     return res.status(200).json(new apiResponse(200, groupedRecords, "Last 30 days' attendance records retrieved successfully"));
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

 export {
    submitAttendance,
    showAllAttendance,
    showLast30DaysAttendance
 }