module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      category: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
        unique: true
      }
    },
    {}
  );
  categories.associate = (models) => {
    categories.hasMany(models.Articles, {
      foreignKey: 'category'
    });
  };
  return categories;
};
