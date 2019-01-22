/* eslint-disable no-unused-vars */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    Title: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    },
    Content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    featuredImageUrl: {
      type: Sequelize.STRING
    },
    averageRating: {
      type: Sequelize.FLOAT
    },
    readTime: {
      type: Sequelize.INTEGER
    },
    Slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    authorId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    ispublished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles')
};
