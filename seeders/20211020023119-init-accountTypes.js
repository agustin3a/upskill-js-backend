"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountTypesDescriptions = [
      "Checking",
      "Savings",
      "Money market",
      "Certificate of deposit",
      "Brokerage account",
    ];
    const now = new Date();
    const acccountTypeObjects = accountTypesDescriptions.map((description) => {
      return { description, createdAt: now, updatedAt: now };
    });
    await queryInterface.bulkInsert("account_type", acccountTypeObjects, {});
    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("account_type", null, {});
    return;
  },
};
