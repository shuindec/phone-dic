const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact = {
        name: req.body.name,
    };
    Contacts.create(contact)
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

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message: err.message || "Some error occurred"
    });
});
    
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;

    Contacts.findOne({
        where: {id: id }
    })
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

// Update one contact by id
exports.update = (req, res) => {
    
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId;

    Contacts.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) { 
            res.send({
                message: "Contact was deleted successfuly!"
            });
        } else {
            res.send ({
                message: 'Cannot delete!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Contact with id = " + id
        });
    });
    

    
};