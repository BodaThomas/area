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
        clientToken: {
            type: Sequelize.STRING
        }
    });
    return Services;
};