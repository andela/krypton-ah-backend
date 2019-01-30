module.exports = (sequelize, DataTypes) => {
  const CommentsHistory = sequelize.define('CommentsHistory', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    commentId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    previousComment: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Empty commemt: Sorry! the comment is required.'
        },
      },
    },
    action: {
      allowNull: false,
      type: DataTypes.ENUM('update', 'delete'),
      defaultValue: 'update',
      validate: {
        notEmpty: {
          msg: 'Empty action: Sorry! the action performed is required.'
        },
      },
    },
  }, { tableName: 'CommentsHistory' });
  CommentsHistory.associate = (models) => {
    CommentsHistory.belongsTo(models.ArticlesComments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });
  };
  return CommentsHistory;
};
