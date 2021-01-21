const dbConfig = require("../config/db.config");
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");

initialize();

async function initialize() {
    const { host } = dbConfig.HOST;
    const { port } = dbConfig.PORT;
    const { user } = dbConfig.USER;
    const { password } = dbConfig.PASSWORD;
    const { database } = dbConfig.DB;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

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

    await sequelize.sync();
    
    module.exports = db;
}
