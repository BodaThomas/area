var router = require('express').Router();
const Tokens = require("../controllers/tokens.controller.js")

router.post("/addToken", Tokens.addToken);

module.exports = router;