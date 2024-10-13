import mongoose, { Schema } from "mongoose";
const classSchema = new Schema({
    name: {
        type: String,
        required: [true, "Class name is required"],
        minlength: [3, "Class name must be at least 3 characters"],
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
export const classRoomModel = mongoose.model("Class", classSchema);
