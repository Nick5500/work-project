'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Movies', [{
      name: 'Black people',
      time: '14:00:00',
      rating: 2.5
    }])
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Movies', null, {})
  }
};
