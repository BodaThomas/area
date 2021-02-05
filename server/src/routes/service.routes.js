const express = require("express");
const router = express.Router();
const Service = require("../controllers/service.controller.js")

router.post("/getToken", Service.getToken);

module.exports = router;