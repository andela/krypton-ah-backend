module.exports = (sequelize, DataTypes) => {
  const commentsReactions = sequelize.define(
    'commentsReactions',
    {
      UserId: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      commentId: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      reaction: {
        type: DataTypes.BOOLEAN,
        validate: {
          isBoolean: {
            args: [true, false]
          }
        }
      }
    },
    {}
  );
  return commentsReactions;
};
