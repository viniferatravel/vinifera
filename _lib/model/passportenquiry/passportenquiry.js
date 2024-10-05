import mongoose, { Schema } from "mongoose";

const PassportSchema = new Schema({
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
    services: 
        {

            type: String,
            require: true,

        }
    ,
    query: {
        type: String,
        require: true,
    }
})

export const PassportEnquiry = mongoose.models.PassportEnquiry || mongoose.model("PassportEnquiry", PassportSchema)