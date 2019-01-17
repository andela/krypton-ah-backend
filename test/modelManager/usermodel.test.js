const chai = require('chai');
const userModelManager = require('../../lib/modelManagers/usermodel');

const { expect } = chai;

const email = 'testmail@yahoo.com',
  password = '111111',
  firstname = 'testfirstname',
  lastname = 'testlastname';

let createdUser;
describe('Test for sending user info into database', () => {
  it('Should have method that sends user info to database', () => {
    expect(userModelManager.create).to.be.a('function');
  });

  it('should return a creted user object', async () => {
    expect(firstname).to.be.a('string');
    expect(lastname).to.be.a('string');
    expect(password).to.be.a('string');
    expect(email).to.be.a('string');

    createdUser = await userModelManager.create(email, password, firstname, lastname);
    const { dataValues } = createdUser;

    dataValues.lastname.should.equal('testlastname');
    dataValues.firstname.should.equal('testfirstname');
  });
});

describe('findUserByEmail', () => {
  it('Should return null if the parameter value does not exist', async () => {
    const userDetails = await userModelManager.findUserByEmail('');
    expect(userDetails).to.equal(null);
  });

  it('Should return user details if email exist', async () => {
    const userDetails = await userModelManager.findUserByEmail(email);
    expect(userDetails).to.be.an('object');
    expect(userDetails.email).to.equal(email);
    expect(userDetails.lastname).to.equal(lastname);
    expect(userDetails.firstname).to.equal(firstname);
    expect(userDetails.password).to.equal(password);
  });
});
