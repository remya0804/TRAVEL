import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profession: {type: String, default: ""},
    company: {type: String, default: ""},
    photo:{type: String, default: ""},
    date: {type: Date, default: Date.now()}
    
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel