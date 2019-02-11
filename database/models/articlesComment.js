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
    originalId: {
      type: DataTypes.UUID
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
    },
    originalDate: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
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
    ArticlesComments.hasMany(ArticlesComments, {
      foreignKey: 'originalId',
      as: 'history'
    });
    ArticlesComments.hasMany(models.CommentsReactions, {
      foreignKey: 'commentId'
    });
    ArticlesComments.hasOne(models.ArticlesHighlights, {
      foreignKey: 'commentId'
    });
  };
  return ArticlesComments;
};
