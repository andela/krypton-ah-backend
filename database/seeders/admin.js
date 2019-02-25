const { admin } = require('../../constants/mocks');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [admin], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
