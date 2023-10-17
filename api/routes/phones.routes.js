module.exports = app => {
    const phones = require("../controllers/phone.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:id/phones", phones.create);
  
    router.get("/contacts/:id/phones", phones.findAll);
  
    router.get("/contacts/:id/phones/:phoneId", phones.findOne);
  
    router.put("/contacts/:id/phones/:phoneId", phones.update);
  
    router.delete("/contacts/:id/phones/:phoneId", phones.delete);
  
    app.use('/api', router);
};