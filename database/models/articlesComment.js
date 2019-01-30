module.exports = (sequelize, DataTypes) => {
  const ArticlesComments = sequelize.define('ArticlesComments', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
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
    },
    updated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          args: [true, false]
        }
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isBoolean: {
          args: [true, false]
        }
      }
    }
  });
  ArticlesComments.associate = (models) => {
    ArticlesComments.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    ArticlesComments.hasMany(ArticlesComments, {
      foreignKey: 'mainCommentId',
      as: 'threads'
    });
    ArticlesComments.hasMany(models.CommentsReactions, {
      foreignKey: 'commentId'
    });
  };
  return ArticlesComments;
};
