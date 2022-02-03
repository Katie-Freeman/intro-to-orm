'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.renameColumn('Movies', 'name', "title");
  },

  down: async  (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Movies', 'title', "name");
  }
};
