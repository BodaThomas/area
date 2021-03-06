const db = require("./models/index.js");
const api = require("./api/index.js");

async function create() {
    await api.create();
}

module.exports.create = create;