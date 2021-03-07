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
            type: Sequelize.STRING(500)
        },
        expires_at: {
            type: Sequelize.BIGINT
        }
    });
    return Tokens;
};