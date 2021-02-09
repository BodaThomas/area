module.exports = (sequelize, Sequelize) => {
    const Reactions = sequelize.define("Reactions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serviceId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        params: {
            type: Sequelize.STRING
        }
    });
    return Reactions;
};