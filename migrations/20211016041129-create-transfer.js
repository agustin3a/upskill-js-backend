"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transfers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sender_amount: {
        type: Sequelize.FLOAT,
      },
      recipient_amount: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      sender_user_id: {
        type: Sequelize.STRING(400),
        allowNull: false,
        references: {
          model: "users",
          key: "uid",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      sender_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      sender_currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "currencies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      recipient_user_id: {
        type: Sequelize.STRING(400),
        allowNull: false,
        references: {
          model: "users",
          key: "uid",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      recipient_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      recipient_currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "currencies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transfers");
  },
};
