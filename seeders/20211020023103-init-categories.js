"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesDescription = [
      "Groceries",
      "Entertainment",
      "Transfer",
      "Transport",
      "Gifts",
      "Medicine",
      "Studies",
      "Services",
    ];
    const now = new Date();
    const categoriesObjects = categoriesDescription.map((description) => {
      return { display: true, description, createdAt: now, updatedAt: now };
    });
    await queryInterface.bulkInsert("categories", categoriesObjects, {});
    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
    return;
  },
};
