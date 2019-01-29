module.exports = (sequelize, DataTypes) => {
  const ReportTag = sequelize.define(
    'ReportTag',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
  );
  return ReportTag;
};
