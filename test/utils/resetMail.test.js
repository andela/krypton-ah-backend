const { expect } = require('chai'),
  faker = require('faker'),
  resetMail = require('../../lib/utils/emailService/resetMail'),
  { UUID } = require('../../constants/index');

describe('Check function that sends resets mail', () => {
  it('should return a promise if function is called', () => {
    const mail = resetMail(faker.internet.email(), UUID);
    expect(mail).to.be.instanceof(Promise);
  });
});
