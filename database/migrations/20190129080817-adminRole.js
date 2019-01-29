module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AdminRoles', {
    id: {
      type: Sequelize.UUID
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('AdminRoles')
};
