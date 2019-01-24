module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleTags', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      },
      onDelete: 'cascade'
    },
    tagId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Tags',
        key: 'id',
        as: 'tagId'
      },
      onDelete: 'cascade'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    }
  }),
  down: queryInterface => queryInterface.dropTable('ArticleTags')
};
