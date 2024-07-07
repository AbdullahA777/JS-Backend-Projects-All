// let students = [];

// const addStudent = (name) => {
//     students.push({ id: students.length + 1, name });
//     return students;
// };

// const getStudents = () => {
//     return students;
// };

// export { addStudent, getStudents };



import mongoose, {Schema} from "mongoose";


const studentSchema= new Schema(
    {
        name: {
            type: String,
            required: true
          },
          userId: [
            {
                type : Schema.Types.ObjectId,
                ref : "User"
            }
        ]
    },     
    {
        timestamps :true
    }
);


export const Student = mongoose.model("Student", studentSchema )