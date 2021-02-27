const db = require("../../models");
const Actions = db.actions;

module.exports = async () => {
    obj = await Actions.findOne({ where: {name: "New pin Discord"}})
    const action = {
        name: "New pin Discord",
        serviceId: 3,
        description: "Check if there is a new pin",
        params: "Server,Channel",
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