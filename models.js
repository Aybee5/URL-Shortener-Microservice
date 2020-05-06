const mongoose = require("mongoose")

const UrlSchema = new mongoose.Schema({
    url: String,
    short_url: String
})

module.exports = mongoose.model("urlSchema", UrlSchema)