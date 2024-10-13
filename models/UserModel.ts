import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Grades extends Document {
    subject: string;
    grade: Number;
}

export interface ClassRoom extends Document {
    name: string;
    students: UserModel[];
}

export interface UserModel extends Document {
    username: string;
    email: string;
    password: string;

    classRoom: ClassRoom;
    
    grades: Grades[];
    role: "t" | "s";
}
const UserSchema: Schema<UserModel> = new Schema<UserModel>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    classRoom: {
        type: Object,
        required: true
    },
    grades: {
        type: [Object],
        required: true
    },
    role: {
        type: String,
        default: "s"
    }
    });
export const Users: Model<UserModel> = mongoose.model<UserModel>('user', UserSchema);
