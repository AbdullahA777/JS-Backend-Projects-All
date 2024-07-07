// let students = [];

// const addStudent = (name) => {
//     students.push({ id: students.length + 1, name });
//     return students;
// };

// const getStudents = () => {
//     return students;
// };

// export { addStudent, getStudents };



import mongoose, { Schema } from "mongoose";


const attendanceSchema = new Schema(
    {
        insName: {
            type : String,
            required : true,
        },
        level: {
            type : String,
            required : true,
        },
        students: [
            {
                name: {
                    type: String,
                    required: true
                },
                attended: {
                    type: Boolean,
                    required: true
                }
            }
        ],
    },
    {
        timestamps: true
    }
);


export const Attendance = mongoose.model("Attendance", attendanceSchema)