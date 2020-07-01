const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
    {
        name: String,
        url: String,
        projectId:String
    }
)

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;