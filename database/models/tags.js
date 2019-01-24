module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    'Tags',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      tagName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: ['^[#a-zA-Z0-9]+$', 'i'],
        }
      },
    },
  );
  Tags.associate = (models) => {
    Tags.belongsToMany(models.Articles, {
      as: 'articles',
      through: 'ArticleTags',
      foreignKey: 'tagId'
    });
  };
  return Tags;
};
