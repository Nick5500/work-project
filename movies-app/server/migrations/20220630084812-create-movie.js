'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Movies');
  }
};
