var router = require('express').Router();
const Tokens = require("../controllers/tokens.controller.js")

router.post("/addToken", Tokens.addToken);

router.get("/", Tokens.getGithubCode); // CHANGER POUR FONCTION

module.exports = router;