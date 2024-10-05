import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    user_role: String,
    user_id: String,
    hashPassword: String,
});

export const User = mongoose.models.user || mongoose.model("user", userModel);