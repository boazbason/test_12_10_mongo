import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
    _id: Types.ObjectId;
    name: string;
    teacher: Types.ObjectId;
    students: Types.ObjectId[];
}


const classSchema: Schema<IClass> = new Schema<IClass>({
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

export const classRoomModel = mongoose.model<IClass>("Class", classSchema);