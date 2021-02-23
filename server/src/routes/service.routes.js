var router = require('express').Router();
const Service = require("../controllers/service.controller.js")

router.post("/getToken", Service.getToken);

router.get("/connectServices", Service.connect);

module.exports = router;