import mongoose from "mongoose";

const locationModel = new mongoose.Schema({
    country: String,
    state: String,
    city: String,
});

export const Location = mongoose.models.location || mongoose.model("location", locationModel);