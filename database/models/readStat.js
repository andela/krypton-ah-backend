module.exports = (sequelize, DataTypes) => {
  const ReadStat = sequelize.define(
    'ReadStats',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      articleId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Articles',
          key: 'id'
        }
      },
      readerId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      readStat: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    { tableName: 'ReadStats' }
  );
  ReadStat.associate = (models) => {
    ReadStat.belongsTo(models.User, {
      foriegnKey: 'readerId',
      as: 'reader',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    ReadStat.belongsTo(models.Articles, {
      foriegnKey: 'articleId',
      as: 'article',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return ReadStat;
};
