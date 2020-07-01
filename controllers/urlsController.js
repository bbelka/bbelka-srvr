const db = require("../models");

module.exports = {
    create: async function (req, res) {
        try {
            const url = await db.Url.create(req.body);
            const project = await db.Project.findOneAndUpdate({ _id: req.body.projectId }, { $push: { urls: url._id } }, { new: true });
            res.json(project)
        } catch (err) {
            res.json(err)
        }
    },
    findById: function (req, res) {
        db.Url
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req,res){
        db.Url
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: async function (req, res) {
        await db.Project.updateMany({}, { $pull: { urls: req.params.id } }, { multi: true })

        db.Url
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}