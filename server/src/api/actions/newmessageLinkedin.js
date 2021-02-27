const db = require("../../models");
const Actions = db.actions;

module.exports = async () => {
    obj = await Actions.findOne({ where: {name: "New message Linkedin"}})
    const action = {
        name: "New message Linkedin",
        serviceId: 7,
        description: "Check if the user has a new message",
        params: "",
        lastResult: ""
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
        if (obj.lastResult != action.lastResult) {
            obj.lastResult = action.lastResult;
        }
        await obj.save();
    }
    return action;
}