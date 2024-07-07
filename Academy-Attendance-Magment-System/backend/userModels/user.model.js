import mongoose, {Schema} from "mongoose";


const userSchema= new Schema(
    {
        fullName : {
            type : String,
            requried : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        level : {
            type : String,
            requried : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            requried : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        password : {
            type : String,
            requried : [true, 'password is required']
        },
    },
    {
        timestamps :true
    }
);


export const User = mongoose.model("User", userSchema )