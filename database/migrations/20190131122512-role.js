module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('Roles')
};
