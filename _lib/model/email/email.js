import mongoose, { Schema } from "mongoose";

const EmailSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    package_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        require: true,
    }
})

export const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema)