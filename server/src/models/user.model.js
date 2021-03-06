module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        registerToken: {
            type: Sequelize.STRING
        },
        isValid: {
            type: Sequelize.BOOLEAN
        },
        accessToken: {
            type: Sequelize.STRING
        }
    });
    return User;

};