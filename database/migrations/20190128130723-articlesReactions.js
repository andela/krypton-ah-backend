/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticlesReactions', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    reaction: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ArticlesReactions')
};
