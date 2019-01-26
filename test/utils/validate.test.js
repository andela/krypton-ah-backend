const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  {
    validateUrl,
    validatePhoneNumber,
    validateGender,
    validateEmailNotification,
    validateUsername,
    validateArticleContent,
    validateIsPublished,
    validateArticleDescription,
    validateArticleTitle
  } = require('../../lib/utils/validate'),
  {
    requestMock,
    VALIDATE_EMAIL_NOTIFICATION_ERROR,
    VALIDATE_GENDER_ERROR,
    VALIDATE_PHONENUMBER_ERROR,
    VALIDATE_URL_ERROR,
    VALIDATE_USERNAME_ERROR,
    VALIDATE_ARTICLE_CONTENT_ERROR,
    isRequiredError,
    booleanError
  } = require('../../constants'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  articleModelManager = require('../../lib/modelManagers/articlemodel'),
  mockArticle = require('../mockData').article,
  { userdata3 } = require('../mockData'),
  { User } = require('../../database/models');

describe('Profile validators', async () => {
  let req;
  describe('URL validator with valid url', () => {
    before(async () => {
      requestMock.body.url = 'https://valid-url.com';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid url', async () => {
      validateUrl(req, 'url');
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('URL validator with invalid url', () => {
    before(async () => {
      requestMock.body.url = 'bad-url';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid url', async () => {
      validateUrl(req, 'url');
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(`url ${VALIDATE_URL_ERROR}`);
    });
  });

  describe('Phone number validator with valid phone number', () => {
    before(async () => {
      requestMock.body.phonenumber = '+2348123456789';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid phone number', async () => {
      validatePhoneNumber(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Phone number validator with invalid phone number', () => {
    before(async () => {
      requestMock.body.phonenumber = '234r';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid phone number', async () => {
      validatePhoneNumber(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(VALIDATE_PHONENUMBER_ERROR);
    });
  });

  describe('Gender validator with valid gender', () => {
    before(async () => {
      requestMock.body.gender = 'female';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid gender', async () => {
      validateGender(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Gender validator with valid gender', () => {
    before(async () => {
      requestMock.body.gender = 'male';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid gender', async () => {
      validateGender(req, 'gender');
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Gender validator with invalid gender', () => {
    before(async () => {
      requestMock.body.gender = 'fmle';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid gender', async () => {
      validateGender(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(VALIDATE_GENDER_ERROR);
    });
  });

  describe('Email notification validator with valid email notification', () => {
    before(async () => {
      requestMock.body.emailnotification = true;
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid email notification', async () => {
      validateEmailNotification(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Email notification validator with invalid email notification', () => {
    before(async () => {
      requestMock.body.emailnotification = 'email';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid email notification', async () => {
      validateEmailNotification(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(VALIDATE_EMAIL_NOTIFICATION_ERROR);
    });
  });

  describe('username validator with valid username', () => {
    before(async () => {
      requestMock.body.username = 'validusername';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid username', async () => {
      validateUsername(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Email notification validator with invalid email notification', () => {
    before(async () => {
      requestMock.body.username = '----1';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid email notification', async () => {
      validateUsername(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(VALIDATE_USERNAME_ERROR);
    });
  });

  describe('Article content validator with valid article content', () => {
    before(async () => {
      requestMock.body.content = 'This is a valid article content!';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should validate valid article content', async () => {
      validateArticleContent(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('Article content validator with invalid article content', () => {
    before(async () => {
      requestMock.body.content = ' ';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    it('should not validate invalid article content', async () => {
      validateArticleContent(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(VALIDATE_ARTICLE_CONTENT_ERROR);
    });
  });

  describe('validateIsPublished with valid option', () => {
    it('should validate valid ispublished value', async () => {
      requestMock.body.ispublished = true;
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      await validateIsPublished(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  it('should validate valid ispublished value', async () => {
    requestMock.body.ispublished = false;
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    await validateIsPublished(req);
    const errors = req.validationErrors();
    expect(errors).to.equal(false);
  });
  describe('validateIsPublished with invalid option', () => {
    it('should not validate invalid ispublished value', async () => {
      requestMock.body.ispublished = ' ';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      validateIsPublished(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(isRequiredError('ispublished'));
    });
    it('should not validate invalid ispublished value', async () => {
      requestMock.body.ispublished = 'yes';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      validateIsPublished(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(booleanError('ispublished'));
    });
  });

  describe('validateArticleDescription with valid option', () => {
    it('should validate valid article description value', async () => {
      requestMock.body.description = 'Valid article description';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      await validateArticleDescription(req);
      const errors = req.validationErrors();
      expect(errors).to.equal(false);
    });
  });
  describe('validateArticleDescription with invalid option', () => {
    it('should not validate invalid article description value', async () => {
      requestMock.body.description = ' ';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      await validateArticleDescription(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(isRequiredError('description'));
    });
    it('should not validate invalid article description value', async () => {
      requestMock.body.description = 'yes';
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      await validateArticleDescription(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal('description must be between 5 and 200 characters');
    });
    it('should not validate invalid article description value', async () => {
      requestMock.body.description = 'yes'.repeat(100);
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
      await validateArticleDescription(req);
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal('description must be between 5 and 200 characters');
    });
  });

  describe('validateArticleTitle', () => {
    let req, newUserArticle;
    beforeEach('Create mockUser and mockArtile', async () => {
      const newUser = await UserModelManager.create(
        userdata3.email,
        userdata3.password,
        userdata3.firstname,
        userdata3.lastname
      );
      const articleMock = mockArticle(newUser.id);
      articleMock.authorId = newUser.id;
      newUserArticle = await articleModelManager.createArticle(articleMock);
      requestMock.decodedToken = { payLoad: newUser.id };
      await expressValidator(requestMock, {}, () => {
        req = requestMock;
      });
    });
    afterEach('Delete mocks', async () => {
      User.destroy({
        where: {}
      });
    });
    describe('validateArticleTitle with valid option', () => {
      it('should validate valid article title value', async () => {
        requestMock.body.title = 'Valid article title';
        await validateArticleTitle(req);
        const errors = req.validationErrors();
        expect(errors).to.equal(false);
      });
    });
    describe('validateArticleTitle with invalid option', () => {
      it('should not validate invalid article title value', async () => {
        requestMock.body.title = null;
        await validateArticleTitle(req);
        const errors = req.validationErrors();
        expect(errors[0].msg).to.equal(isRequiredError('title'));
      });
      it('should not validate invalid article title value', async () => {
        requestMock.body.title = 'yes';
        await validateArticleTitle(req);
        const errors = req.validationErrors();
        expect(errors[0].msg).to.equal('title must be between 5 and 400 characters');
      });
      it('should not validate invalid article title value', async () => {
        requestMock.body.title = 'yes'.repeat(200);
        await validateArticleTitle(req);
        const errors = req.validationErrors();
        expect(errors[0].msg).to.equal('title must be between 5 and 400 characters');
      });
      it('should not validate invalid article title value', async () => {
        requestMock.body.title = newUserArticle.title;
        let errors;
        try {
          await validateArticleTitle(req);
          errors = await req.asyncValidationErrors();
        } catch (error) {
          errors = error;
        }
        expect(errors[0].msg).to.equal('title must be unique for a particular user');
      });
    });
  });
});
