module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    reportTagId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'ReportTags',
        key: 'id'
      }
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    resolved: {
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
  down: queryInterface => queryInterface.dropTable('Reports')
};
