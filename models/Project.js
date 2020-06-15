const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "project name is required"
        },
        description: {
            type: String,
            required: "description is required"
        },
        technical: {
            type: String,
            required: "tecnical description is required"
        },
        contribution: {
            type: String,
            required: "delineation of contribution is required"
        },
        technologies: {
            type: String,
            required: "technologies used is required"
        },
        mainImage: {
            type: String,
            trim: true,
            required: "main image is required"
        },
        urls: {
            type: Object,
            properties: {
                deployed: {
                    deployed: String,
                    gitHub: String,
                    server:String
                }
            },
            screenshots: Array
        }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;