module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticlesComments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    originalId: {
      type: Sequelize.UUID,
      allowNull: true,
      foreignKey: true,
      references: {
        model: 'ArticlesComments',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    mainCommentId: {
      type: Sequelize.UUID
    },
    updated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    originalDate: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
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

  down: queryInterface => queryInterface.dropTable('ArticlesComments')
};
