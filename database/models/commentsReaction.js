module.exports = (sequelize, DataTypes) => {
  const commentsReaction = sequelize.define(
    'commentsReaction',
    {
      reaction: {
        type: DataTypes.BOOLEAN,
        validate: {
          isBoolean: {
            args: [true, false],
            msg: 'comment reaction can only be "true" or "false"'
          }
        }
      }
    },
    {}
  );
  commentsReaction.associate = (models) => {
    commentsReaction.belongsTo(models.User);
    commentsReaction.belongsTo(models.articlesComment);
  };
  return commentsReaction;
};
