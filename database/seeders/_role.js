const { role } = require('../../constants/mocks');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [role], {}),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
