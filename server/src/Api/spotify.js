const db = require("../models");
const Service = db.services;

module.exports = async () => {
    const Spotify = {
        name: "Spotify",
        actionsId: "",
        reactionId: "",
        clientToken: "fcd812ae0f364abea208d06cdb632e87"
    };
    await Service.create(Spotify);
    return Spotify;
}