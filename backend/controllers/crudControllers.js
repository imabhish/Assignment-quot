const Crud = require("../models/studSchema");


// Display All CRUD Data
const crud_index = (req, res) => {
    Crud.find(function (err, cruds) {
        res.json(cruds);
    });
};

// Create New CRUD
const crud_create_post = (req, res) => {
    let crud = new Crud(req.body);
    crud
        .save()
        .then((crud) => {
            res.send(crud);
        })
        .catch(function (err) {
            res.status(422).send("failed");
        });
};

// Show a particular CRUD Detail by Id
const crud_details = (req, res) => {
    Crud.findById(req.params.id, function (err, crud) {
        if (!crud) {
            res.status(404).send("No result found");
        } else {
            res.json(crud);
        }
    });
};

// Update CRUD Detail by Id
const crud_update = (req, res) => {
    Crud.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            res.json("Updated");
        })
        .catch(function (err) {
            res.status(422).send("Update failed.");
        });
};

// Delete CRUD Detail by Id
const crud_delete = (req, res) => {
    Crud.findById(req.params.id, function (err, crud) {
        if (!crud) {
            res.status(404).send("Not found");
        } else {
            Crud.findByIdAndRemove(req.params.id)
                .then(function () {
                    res.status(200).json("Deleted");
                })
                .catch(function (err) {
                    res.status(400).send("Delete failed.");
                });
        }
    });
};

module.exports = {
    crud_index,
    crud_details,
    crud_create_post,
    crud_update,
    crud_delete,
};