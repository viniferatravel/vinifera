import mongoose from "mongoose";

const locationModel = new mongoose.Schema({
    state: String,
    city: String,
});

export const Location = mongoose.models.location || mongoose.model("location", locationModel);