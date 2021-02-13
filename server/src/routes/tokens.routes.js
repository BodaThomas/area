const express = require("express");
const router = express.Router();
const Tokens = require("../controllers/tokens.controller.js")

router.post("/account/addToken", Tokens.addToken);

module.exports = router;