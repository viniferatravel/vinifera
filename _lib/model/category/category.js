import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    id: String,
    category_type: String,
    category_name: String,
    description: String,
    status: String,
    creation_date: String,
    last_update_on: String
});

export const Category = mongoose.models.category || mongoose.model("category", categoryModel);