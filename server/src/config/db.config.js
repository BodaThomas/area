const { rootCertificates } = require("tls");

module.exports = {
    HOST: "localhost",
    PORT: "8081",
    USER: "root",
    PASSWORD: "root",
    DB: "areaDB",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
