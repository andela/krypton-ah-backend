module.exports = (sequelize, DataTypes) => {
  const articlesComments = sequelize.define('articlesComments', {
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
  articlesComments.associate = (models) => {
    articlesComments.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    articlesComments.belongsTo(models.Articles, {
      foreignKey: 'articleId'
    });
    articlesComments.hasMany(models.commentsReactions, {
      foreignKey: 'commentId'
    });
  };
  return articlesComments;
};
