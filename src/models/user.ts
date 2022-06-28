import mongoose, { Document, Schema } from "mongoose";

export interface UserType{
    name: String,
    password: String,
    current_token: String,
    cash: Number,
    transactions: String[]
};

export interface UserModel extends UserType, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        current_token: { type: String, required: true },
        cash: { type: Number, required: true },
        transactions: { type: Array, required: true }
    }
)

export default mongoose.model<UserModel>('User', UserSchema)