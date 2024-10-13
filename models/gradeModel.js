import mongoose, { Schema } from "mongoose";
const gradeSchema = new Schema({
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    grade: {
        type: Number,
        required: [true, "Grade is required"],
    },
});
export const gradeModel = mongoose.model("Grade", gradeSchema);
