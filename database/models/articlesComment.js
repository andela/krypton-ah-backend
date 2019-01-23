module.exports = (sequelize, DataTypes) => {
  const ArticlesComments = sequelize.define('ArticlesComments', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID
    },
    articleId: {
      type: DataTypes.UUID
    },
    mainCommentId: {
      type: DataTypes.UUID
    }
  });
  ArticlesComments.associate = (models) => {
    ArticlesComments.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    ArticlesComments.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    ArticlesComments.hasMany(models.CommentsReactions, {
      foreignKey: 'commentId'
    });
  };
  return ArticlesComments;
};
