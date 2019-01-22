module.exports = (sequelize, DataTypes) => {
  const articlesComment = sequelize.define('articlesComment', {
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
  articlesComment.associate = (models) => {
    articlesComment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    articlesComment.belongsTo(models.Articles, {
      foreignKey: 'articleId',
    });
  };
  return articlesComment;
};
