const Imgur = require("./Api/imgur")

var functionAction = {"new_like": Imgur.new_like}

exports.checkAction = () => {
    functionAction["new_like"]()
}