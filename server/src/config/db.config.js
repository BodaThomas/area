module.exports = {
    HOST: "127.0.0.1:8081",
    USER: "root",
    PASSWORD: null,
    DB: "Users",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}