module.exports = (sequelize, Sequelize) => {
    const Services = sequelize.define("Services", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        actionsId: {
            type: Sequelize.STRING
        },
        reactionsId: {
            type: Sequelize.STRING
        },
        urlLogo: {
            type: Sequelize.STRING
        },
        pColor: {
            type: Sequelize.STRING
        },
        sColor: {
            type: Sequelize.STRING
        },
        OAuthUrl: {
            type: Sequelize.STRING(500)
        }
    });
    return Services;
};