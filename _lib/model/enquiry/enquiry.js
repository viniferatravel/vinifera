import mongoose, { Schema } from "mongoose";

const EnquirySchema = new Schema({
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
    city: {
        type: String,
    },
    adults: {
        type: String,
    },
    date: {
        type: Date,
    },
    query: {
        type: String,
    },
    termsAgreed:{
        type: Boolean,
    },
    updatesAgreed:{
        type: Boolean,
    }
})

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema)