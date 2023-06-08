"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("books", "pages", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("books", "published", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("books", "language", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("books", "pages");
    await queryInterface.removeColumn("books", "published");
    await queryInterface.removeColumn("books", "language");
  },
};
