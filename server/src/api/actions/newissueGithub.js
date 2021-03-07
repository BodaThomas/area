const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New issue Github"
const serviceID = 5

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
        description: "Check if there is a new issue in the repo",
        params: "Repository"
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

async function run(element) {
    let nbrIssues = Number(element.lastResult);
    if (element.lastResult.length === 0) nbrIssues = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    let count = 0;
    const nameRepo = element.paramsAction;
    const repos = await axios.get(`https://api.github.com/user/repos`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    for (const elem of repos.data) {
        if (elem.name === nameRepo) {
            count = elem.open_issues_count;
        }
    }
    if (nbrIssues != count) {
        element.lastResult = count;
        await element.save();
        if (nbrIssues < count && nbrIssues !== -1)
            return true;
    }
    return false;
}
module.exports.run = run;