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

module.exports = {
  userMock,
  userProfileMock,
  updatedUserProfileMock,
  requestMock,
  validProfileRequestMock,
  invalidProfileRequestMock,
  responseMock,
  nextMock
};
