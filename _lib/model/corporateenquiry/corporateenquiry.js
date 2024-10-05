import mongoose, { Schema } from "mongoose";

const CorporateSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    companyname:
    {
        type: String,
        require: true,
    },
    noofdays: {
        type: String,
        require: true,
    },
    destination: {
        type: String,
        require: true,
    },
    purpose: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    queries: {
        type: String,
        require: true,
    },
})

export const CorporateEnquiry = mongoose.models.CorporateEnquiry || mongoose.model("CorporateEnquiry", CorporateSchema)