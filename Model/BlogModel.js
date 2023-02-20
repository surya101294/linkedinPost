const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    "title": String,
    "body": String,
    "device": String,
    "no_if_comments": Number,
    "user": String
})

const BlogModel = mongoose.model("post", blogSchema)

module.exports = { BlogModel }