module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmarks', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    articleId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, {
      foriegnKey: 'UserId',
      as: 'user',
      onDelete: 'CASCADE'
    });

    Bookmark.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Bookmark;
};
