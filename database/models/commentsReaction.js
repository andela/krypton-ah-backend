module.exports = (sequelize, DataTypes) => {
  const CommentsReactions = sequelize.define(
    'CommentsReactions',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      UserId: {
        type: DataTypes.UUID
      },
      commentId: {
        type: DataTypes.UUID
      },
      reaction: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  return CommentsReactions;
};
