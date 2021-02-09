const db = require("../models");
const Service = db.services;

module.exports = async () => {
    const Imgur = {
        name: "Imgur",
        actionsId: "",
        reactionId: "",
        clientToken: "5b23bbffd12751f"
    };
    await Service.create(Imgur);
    return Imgur;
}