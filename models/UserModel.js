import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: Number,
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
export const Users = mongoose.model('user', UserSchema);
