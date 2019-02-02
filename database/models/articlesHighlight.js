module.exports = (sequelize, DataTypes) => {
  const ArticlesHighlights = sequelize.define(
    'ArticlesHighlights',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      articleId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Articles',
          key: 'id'
        }
      },
      startIndex: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Empty rating: Sorry! the rating is required.'
          },
        },
      },
      endIndex: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Empty rating: Sorry! the rating is required.'
          },
        },
      },
      commentId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'ArticlesComments',
          key: 'id'
        }
      },
      highlightedText: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { tableName: 'ArticlesHighlights' }
  );
  return ArticlesHighlights;
};
