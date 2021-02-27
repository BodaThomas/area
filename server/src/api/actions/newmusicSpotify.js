const db = require("../../models");
const Actions = db.actions;

const nameAction = "New music Spotify"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 4,
        description: "Check if the user saved a new track",
        params: ""
    };
    if (!obj) {
        await Actions.create(action); 
    }else {
        if (obj.name != action.name) {
            obj.name = action.name;
        }
        if (obj.serviceId != action.serviceId) {
            obj.serviceId = action.serviceId;
        }
        if (obj.description != action.description) {
            obj.description = action.description;
        }
        if (obj.params != action.params) {
            obj.params = action.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(user_id) {
}
module.exports.run = run;