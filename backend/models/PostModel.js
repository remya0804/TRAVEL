import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({

    title: {type: String, required: true},
    desc: {type: String, required: true},
    category: {type: String, required: true},
    userId: {type: String, required: true},
    likes: {type: Array, default: []},
    disLikes: {type: Array, default: []},
    createdDate: {type: Date, default: Date.now()},
    photo: {type: String, required: true},

}, {minimize: false})

const postModel = mongoose.models.post || mongoose.model("post",postSchema)

export default postModel