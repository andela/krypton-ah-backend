const { expect } = require('chai'),
  faker = require('faker'),
  Mailler = require('../../lib/utils/emailService/mailler'),
  resetTemplate = require('../../lib/utils/emailService/emailTemplate/resetPassword');

describe('Check Mailler function', () => {
  try {
    it('should return a promise if all parameters are inserted', () => {
      const mail = Mailler(faker.internet.email(), 'Author-Haven Test', resetTemplate('www.google.com'));
      expect(mail).to.be.instanceof(Promise);
    });
  } catch (error) {
    throw error;
  }
});
