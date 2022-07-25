'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('Movies', 'long', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }, { transaction });

      await queryInterface.addColumn('Movies', 'people', {
        type: Sequelize.INTEGER,
        defaultValue: 15
      }, { transaction })

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('Movies', 'long');
      await queryInterface.removeColumn('Movies', 'people')

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
    }
  }
};
