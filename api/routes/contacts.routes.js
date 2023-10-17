module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/", contacts.create);
  
    router.get("/contacts/", contacts.findAll);
  
    router.get("/contacts/:id", contacts.findOne);
  
    router.put("/contacts/:id", contacts.update);
  
    router.delete("/contacts/:id", contacts.delete);
  
    app.use('/api', router);
};