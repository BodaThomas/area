module.exports = (sequelize, Sequelize) => {
    const Tokens = sequelize.define("Tokens", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        serviceId: {
            type: Sequelize.INTEGER
        },
        accessToken: {
            type: Sequelize.STRING(500)
        },
        refreshToken: {
            type: Sequelize.STRING
        }
    });
    return Tokens;
};