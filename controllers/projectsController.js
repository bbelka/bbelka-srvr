const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Project
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Project
            .findOne({ _id: req.params.id })
            .populate("posts")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {

        const project = {
            name: req.body.name,
            description: req.body.description,
            technical: req.body.technical,
            contribution: req.body.contribution,
            technologies: req.body.technologies,
            mainImage: req.body.mainImage,
            screenshots: req.body.screenshots
        }
        console.log(project)

        db.Project
            .create(project)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Project
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: async function (req, res) {
        await db.User.updateMany({}, { $pull: { projects: req.params.id } }, { multi: true })

        db.Project
            .deleteOne({ _id: req.params.id })
            .then(dbModel => req.json(dbModel))
            .catch(err => res.json(err))
    }
}