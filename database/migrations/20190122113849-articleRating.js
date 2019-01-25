/* eslint-disable no-unused-vars */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rating', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    articleId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    reviewerId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
  down: queryInterface => queryInterface.dropTable('Rating')
};
