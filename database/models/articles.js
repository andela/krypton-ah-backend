module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'Articles',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      authorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 400],
            msg: 'Title must be between 5 and 400 characters'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 200],
            msg: 'Description must be between 5 and 200 characters'
          }
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: 250
        }
      },
      featuredImageUrl: {
        type: DataTypes.STRING,
        validate: {
          is: ['(http(s?):)([/|.|[A-Za-z0-9_-]| |-])*.(?:jpg|gif|png)', 'i']
        }
      },
      averageRating: {
        type: DataTypes.FLOAT,
        validate: {}
      },
      slug: {
        type: DataTypes.STRING,
        validate: {}
      },
      readTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      numberOfReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            args: [true, false]
          }
        }
      }
    },
    {}
  );
  Articles.associate = (models) => {
    Articles.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'articleAuthor'
    });
    Articles.hasMany(models.articlesComment, {
      foreignKey: 'articleId',
    });
    Articles.belongsToMany(models.Tags, {
      through: 'ArticleTags',
      as: 'tags',
      foreignKey: 'articleId'
    });
    Articles.hasMany(models.Rating, {
      foreignKey: 'id',
      as: 'articleId'
    });
  };
  return Articles;
};
