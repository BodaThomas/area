const Imgur = require("./api/services/imgur.js")

var functionAction = {"new_like": Imgur.new_like}

exports.checkAction = () => {
    functionAction["new_like"]()
}