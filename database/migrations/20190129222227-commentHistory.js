module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentsHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    commentId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'ArticlesComments',
        key: 'id'
      }
    },
    previousComment: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('CommentsHistory')
};
