const mongoose = require("mongoose")
const Schema = mongoose.Schema

const historySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: "histories" })

const Blog = mongoose.model("Blog", historySchema)
module.exports = Blog