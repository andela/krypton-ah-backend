const faker = require('faker');
const {
  User, Articles, ArticlesComments, Tags, CommentsReactions
} = require('../database/models');

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
  value:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDc3MDMzOTAsImV4cCI6MTU3OTIzOTM5MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.TNKCzz2ZqSyv7YP3YeK6x0y43ekMxq6Ah-0KDifhAPc'
};

const userdata = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: faker.random.boolean()
};

const userdata2 = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: faker.random.boolean()
};

const userdata3 = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: 'password',
  firstname: 'firstname',
  lastname: 'lastname',
  isverified: true
};

const fakeUserData = {
  id: faker.random.uuid(),
  email: 'jjk@hjh.com',
  password: 'refre',
  firstname: 'Gej',
  lastname: 'yut',
  isverified: faker.random.boolean()
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

const article = authorid => ({
  title: 'This is a test title',
  description: faker.lorem.sentence(10, 20),
  content: faker.lorem.paragraph(30),
  featuredImageUrl: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
  averageRating: 0,
  slug: faker.helpers.slugify('title'),
  readTime: 0,
  authorId: authorid
});

const invalidarticle = authorid => ({
  title: 'this is an invlaid article',
  description: faker.lorem.sentence(10, 20),
  content: faker.lorem.paragraph(30),
  featuredImageUrl: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
  averageRating: 0,
  Slug: faker.helpers.slugify('title'),
  readTime: 0,
  authorId: authorid
});

const goodArticle = authorid => ({
  title: 'New title',
  description: faker.lorem.sentence(10, 20),
  content: faker.lorem.paragraph(30),
  featuredImageUrl: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
  averageRating: faker.random.number(5),
  slug: faker.helpers.slugify('title'),
  readTime: faker.random.number(),
  authorId: authorid,
  ispublished: true
});

const badArticle = authorId => ({
  title: 'Th',
  description: 'aa',
  content: '',
  featuredImageUrl: 'hh',
  readTime: faker.random.number(),
  ispublished: 'no',
  authorId
});

const updatearticle = authorid => ({
  title: faker.lorem.sentence(10, 20),
  description: faker.lorem.sentence(10, 20),
  content: faker.lorem.paragraph(30),
  featuredImageUrl: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
  averageRating: 0,
  Slug: faker.helpers.slugify('title'),
  readTime: 0,
  authorId: authorid
});

const tag = ({
  tag1: 'Andela',
  tag2: 'JavaScript',
  tag3: 'Sequelize',
  invalidTag: '*&come',
  validTag: '#TIA',
  tag4: 'Java'
});

const comment = (articleId, userId) => ({
  id: faker.random.uuid(),
  comment: 'This is a test title',
  articleId,
  userId
});

const reaction = (commentId, UserId) => ({
  id: faker.random.uuid(),
  commentId,
  UserId,
  reaction: 'dislike',
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
});

const tags = { tag: 'Andela, JavaScript,Sequelize' };

const destroyData = () => {
  User.destroy({
    where: {}
  });
  Tags.destroy({
    where: {}
  });
  Articles.destroy({
    where: {}
  });
  ArticlesComments.destroy({
    where: {}
  });
  CommentsReactions.destroy({
    where: {}
  });
};
const returnedTag = [];
returnedTag.push({
  dataValues:
   {
     tagName: 'JavaScript'
   },
});

const tagArray = ['JavaScript', 'Java'];

module.exports = {
  token,
  article,
  reaction,
  updatearticle,
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
  fakeUserData,
  tag,
  tags,
  badArticle,
  goodArticle,
  comment,
  destroyData,
  tagArray,
  returnedTag,
  invalidarticle
};
