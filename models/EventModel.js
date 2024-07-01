import mongoose from "mongoose";

// Creating event schema using Mongoose Schema class
const EventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true })


// Creating a model from schema
const Event = mongoose.model("Event", EventSchema)

export default Event