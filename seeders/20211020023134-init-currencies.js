"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currenciesCodes = ["USD", "GTQ", "EUR"];
    const now = new Date();
    const currenciesObjects = currenciesCodes.map((code) => {
      return { code, createdAt: now, updatedAt: now };
    });
    
    await queryInterface.bulkInsert("currencies", currenciesObjects, {});
    return;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("currencies", null, {});
    return;
  },
};
