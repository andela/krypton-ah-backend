const { adminUser } = require('../../constants/mocks');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [adminUser], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
