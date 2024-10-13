import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    email: String;
    password: string;
    role: "student" | "teacher";
    grades: Types.ObjectId[];
}

const hatSchema: Schema<IUser> = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: [true, "Username is required"],
            //unique: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [30, "Username must be less than 30 characters"],
            match: [/^[a-zA-Z0-9_]+$/, "Username must only contain letters and numbers"]
            
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            //unique: true,
            validate: {
              validator: (email: string) => validator.isEmail(email),
              message: "Email is invalid"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
          
        },
        role: {
            type: String,
            enum: ["student", "teacher"],
            required: [true, "Please add the role"],
        },
        grades: [
            {
              type: Schema.Types.ObjectId,
              ref: "Grade",
            },
          ],
    },
  
);




export const Users = mongoose.model<IUser>('User', hatSchema);