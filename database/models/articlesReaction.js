module.exports = (sequelize, DataTypes) => {
  const ArticlesReactions = sequelize.define(
    'ArticlesReactions',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID
      },
      articleId: {
        type: DataTypes.UUID
      },
      reaction: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  return ArticlesReactions;
};
