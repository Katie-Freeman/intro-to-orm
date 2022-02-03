'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('Movies', 'director', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'director')
  }
};
