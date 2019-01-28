module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define(
    'Reports',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      reportTagId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          max: 250
        }
      }
    }, {}
  );
  Reports.associate = (models) => {
    Reports.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'reporter',
      onDelete: 'CASCADE'
    });
    Reports.belongsTo(models.Articles, {
      foreignKey: 'articleId',
      as: 'userArticle',
      onDelete: 'CASCADE'
    });
    Reports.belongsTo(models.ReportTag, {
      foreignKey: 'reportTagId',
      as: 'tag',
      onDelete: 'CASCADE'
    });
  };
  return Reports;
};
