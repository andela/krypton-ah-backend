module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      tagname: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: ['^[a-zA-Z0-9]+$', 'i'],
        }
      },
    },
  );
  tag.associate = (models) => {
    tag.belongsToMany(models.articles, {
      through: 'articleTag',
      as: 'article',
      foreignKey: 'tagId'
    });
  };
  return tag;
};
