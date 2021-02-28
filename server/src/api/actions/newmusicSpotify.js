const db = require("../../models");
const axios = require("axios")
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

async function run() {
    const token = "BQB6BvCszExc-_QDw49ONXjQuyZR8Kvg1jZZzw2EGiY2JIYJG35OLE-102ewRD0wTySG_ROzX2QtBkjJ2OzCoRbx4fH3kzMjoOAOjOuCDt3JfH7XF4Xs4amPdn7x_-YJDrIvmCBIdFzLJ-kUQxWIxMMKJUbvW_P-AJY7w0cjNXev"
    const lastotal = 0;
    const res = await axios.get(`https://api.spotify.com/v1/me/tracks`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) || []
    console.log(res.data)
    if (lastotal < res.data.total) {
        console.log("SAVE DB")
        console.log("REACTIOn")
    }
}
module.exports.run = run;