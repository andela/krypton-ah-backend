const faker = require('faker');

const negativequery = {
  offset: -2,
  limit: -15
};
const defaultquery = {
  offset: '',
  limit: ''
};
const validquery = {
  offset: 2,
  limit: 10
};

const NaNquery = {
  offset: 's',
  limit: 's'
};
const token = {
  id: '846c6586-1a65-4829-8d77-9318c6bbf080',
  value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDc3MDMzOTAsImV4cCI6MTU3OTIzOTM5MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.TNKCzz2ZqSyv7YP3YeK6x0y43ekMxq6Ah-0KDifhAPc'
};

const userdata = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: faker.random.boolean(),
};

const userdata2 = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: faker.random.boolean(),
};

const userdata3 = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: faker.random.boolean(),
};

const fakeUserData = {
  id: faker.random.uuid(),
  email: 'jjk@hjh.com',
  password: 'refre',
  firstname: 'Gej',
  lastname: 'yut',
  isverified: faker.random.boolean(),
};

const userprofile = {
  UserId: userdata.id,
  avatar: faker.image.imageUrl(),
  username: 'name1',
  country: 'nigeria',
  bio: faker.name.jobType(),
  phonenumber: faker.phone.phoneNumber(),
  gender: 'M',
  emailnotification: faker.random.boolean(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
};

const userprofile2 = {
  UserId: userdata2.id,
  avatar: faker.image.imageUrl(),
  username: 'name2',
  country: 'nigeria',
  bio: faker.name.jobType(),
  phonenumber: faker.phone.phoneNumber(),
  gender: 'M',
  emailnotification: faker.random.boolean(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
};

const userprofile3 = {
  UserId: userdata3.id,
  avatar: faker.image.imageUrl(),
  username: 'name3',
  country: 'nigeria',
  bio: faker.name.jobType(),
  phonenumber: faker.phone.phoneNumber(),
  gender: 'M',
  emailnotification: faker.random.boolean(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
};

module.exports = {
  token,
  defaultquery,
  validquery,
  NaNquery,
  userdata,
  userdata2,
  userdata3,
  userprofile,
  userprofile2,
  userprofile3,
  negativequery,
  fakeUserData
};
