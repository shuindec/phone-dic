module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        type: {
            type: Sequelize.STRING,
        },
        number: {
            type: Sequelize.INTEGER,
        },
        contactId: {
            type: Sequelize.INTEGER,
        },
    });
  
    return Phone;
};