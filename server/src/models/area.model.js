module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("Area", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        actionId: {
            type: Sequelize.INTEGER
        },
        reactionId: {
            type: Sequelize.INTEGER
        },
        paramsAction: {
            type: Sequelize.STRING
        },
        paramsReaction: {
            type: Sequelize.STRING
        },
        lastResult: {
            type:  Sequelize.STRING
        }
    });
    return Area;
};