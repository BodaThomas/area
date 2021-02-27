var router = require('express').Router();
const Service = require("../controllers/service.controller.js")

router.get("/getServices", Service.getServices)

router.post("/getToken", Service.getToken);

router.get("/connectServices", Service.connect);

// router.get("/getActions", Service)

module.exports = router;