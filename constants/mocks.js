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

module.exports = {
  userMock,
  userProfileMock,
  updatedUserProfileMock
};
