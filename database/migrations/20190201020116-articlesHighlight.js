/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticlesHighlights', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    articleId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    startIndex: {
      type: Sequelize.INTEGER,
    },
    endIndex: {
      type: Sequelize.INTEGER,
    },
    commentId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'ArticlesComments',
        key: 'id'
      }
    },
    highlightedText: {
      type: Sequelize.TEXT,
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ArticlesHighlights')
};
