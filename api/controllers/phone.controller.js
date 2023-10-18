const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const contactId = req.params.contactId;
    const phone = {
        contactId,
        type: req.body.type,
        number: req.body.number,
    };
    Phones.create(phone)
    .then(data => { 
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
        err.message || "Some error occurred"
    });

    });
    
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll()
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message: err.message || "Some error occurred"
    });
});
    
};

// Get one phone by id
exports.findOne = (req, res) => {  
    const id = req.params.id;

    Contacts.findOne(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Contact with id=${id} not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving contact with id=" + id
            });
        });

};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.id;
    Contacts.update(req.body, {
    where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Task was updated successfully."
                });
            } 
        else {
            res.send({
            message: `Cannot update Task`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Task with id=" + id
        });
    });
    
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Phones.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) { 
            res.send({
                message: "Phone was deleted successfuly!"
            });
        } else {
            res.send ({
                message: 'Cannot delete!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Phone with id = " + id
        });
    });
    
};