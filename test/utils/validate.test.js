const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  {
    validateUrl,
    validatePhoneNumber,
    validateGender,
    validateEmailNotification,
    validateUsername
  } = require('../../lib/utils/validate'),
  {
    requestMock,
    VALIDATE_EMAIL_NOTIFICATION_ERROR,
    VALIDATE_GENDER_ERROR,
    VALIDATE_PHONENUMBER_ERROR,
    VALIDATE_URL_ERROR,
    VALIDATE_USERNAME_ERROR
  } = require('../../constants');

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
      validatePhoneNumber(req, 'phonenumber');
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
      validatePhoneNumber(req, 'phonenumber');
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(`phonenumber ${VALIDATE_PHONENUMBER_ERROR}`);
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
      validateGender(req, 'gender');
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
      validateGender(req, 'gender');
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(`gender ${VALIDATE_GENDER_ERROR}`);
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
      validateEmailNotification(req, 'emailnotification');
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
      validateEmailNotification(req, 'emailnotification');
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(`emailnotification ${VALIDATE_EMAIL_NOTIFICATION_ERROR}`);
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
      validateUsername(req, 'username');
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
      validateUsername(req, 'username');
      const errors = req.validationErrors();
      expect(errors[0].msg).to.equal(`username ${VALIDATE_USERNAME_ERROR}`);
    });
  });
});
