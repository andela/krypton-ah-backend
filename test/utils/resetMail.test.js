const { expect } = require('chai'),
  faker = require('faker'),
  resetMail = require('../../lib/utils/emailService/resetMail');

describe('Check function that sends resets mail', () => {
  it('should return a promise if function is called', () => {
    const mail = resetMail(faker.internet.email(), '78y8h');
    expect(mail).to.be.instanceof(Promise);
  });
});
