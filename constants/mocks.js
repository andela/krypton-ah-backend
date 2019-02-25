require('dotenv').config();
const bcrypt = require('bcrypt');

const userMock = {
  email: 'testuser@email.com',
  userId: 'testuserid',
  password: 'pass',
  firstname: 'firstname',
  lastname: 'lastname'
};
const userProfileMock = {
  avatar: 'https://testavarturl.com',
  bio: 'Test bio',
  username: 'user1',
  country: 'Nigeria',
  phonenumber: '7862',
  gender: 'male',
  emailnotification: false
};
const updatedUserProfileMock = {
  avatar: 'https://testavarturl2.com',
  bio: 'Test bio2',
  username: 'user12',
  country: 'Ghana',
  phonenumber: '+2348126573983',
  gender: 'female',
  emailnotification: true
};

const requestMock = {
  body: {}
};

const validProfileRequestMock = {
  body: {
    avatar: 'https://valid.com',
    bio: 'A little about me.',
    username: 'user',
    country: 'Nigeria',
    phonenumber: '+234587239458',
    gender: 'male',
    emailnotification: false
  }
};

const invalidProfileRequestMock = {
  body: {
    avatar: 'https://valid',
    username: 'user nn',
    phonenumber: '22222',
    gender: 'fgg',
    emailnotification: 'not'
  }
};

const responseMock = {
  status: () => {},
  json: () => {}
};

const nextMock = {
  next: () => {}
};

const adminUser = {
  id: 'aa94832a-19cf-11e9-ab14-d663bd873d65',
  firstname: process.env.ADMIN_FIRSTNAME,
  lastname: process.env.ADMIN_LASTNAME,
  isverified: true,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8)),
  email: process.env.ADMIN_EMAIL_1,
  createdAt: new Date(),
  updatedAt: new Date()
};

const role = {
  id: 'bb94832a-19cf-11e9-ab14-d663bd873d32',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};

const admin = {
  id: 'cc94832a-19cf-11e9-ab14-d663bd873d33',
  roleId: 'bb94832a-19cf-11e9-ab14-d663bd873d32',
  userId: 'aa94832a-19cf-11e9-ab14-d663bd873d65',
  createdAt: new Date(),
  updatedAt: new Date()
};

module.exports = {
  userMock,
  userProfileMock,
  updatedUserProfileMock,
  requestMock,
  validProfileRequestMock,
  invalidProfileRequestMock,
  responseMock,
  nextMock,
  adminUser,
  admin,
  role
};
