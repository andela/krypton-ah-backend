const { admin1, admin2 } = require('../../constants/mocks');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [admin1, admin2], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
