const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.areas = require("./areas.model.js")(sequelize, Sequelize);
db.services = require("./services.model.js")(sequelize, Sequelize);
db.actions = require("./actions.model.js")(sequelize, Sequelize);
db.reactions = require("./reactions.model.js")(sequelize, Sequelize);
db.tokens = require("./tokens.model.js")(sequelize, Sequelize);

module.exports = db;
