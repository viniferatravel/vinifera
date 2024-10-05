import mongoose, { Schema } from "mongoose"

const FeedBackSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true,
    },
    feedback: {
        type: String,
        require: true,
    },
    feedropdown: {
        type: String,
        require: true,
    }
})

export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedBackSchema)