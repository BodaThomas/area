module.exports = (sequelize, Sequelize) => {
    const Areas = sequelize.define("Areas", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        groupes: {
            type: Sequelize.STRING
        }
    });
    return Areas;
};