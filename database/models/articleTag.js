module.exports = (sequelize, DataTypes) => {
  const ArticleTags = sequelize.define(
    'ArticleTags',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false

      },
      tagId: {
        type: DataTypes.UUID,
        allowNull: false
      },
    },
  );
  return ArticleTags;
};
