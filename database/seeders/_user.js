const { adminUser, adminUser2 } = require('../../constants/mocks');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [adminUser, adminUser2], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
