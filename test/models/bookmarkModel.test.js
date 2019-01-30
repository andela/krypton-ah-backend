const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Articles = require('../../database/models/articles');
const Bookmark = require('../../database/models/bookmarks');

describe('Test the Bookmark Model', () => {
  const bookmarks = Bookmark(sequelize, dataTypes);
  const bookmark = new bookmarks();

  context('Check if the Bookmark model exists', () => {
    it('should have model valid model name (Bookmark) ', () => {
      expect(bookmarks.modelName).to.equal('Bookmarks');
    });
  });

  context('Check the properties of the Bookmark Model', () => {
    it('The Bookmark Model should have the property articleId', () => {
      expect(bookmark).to.have.property('articleId');
    });

    it('The Bookmark Model should have the property userId', () => {
      expect(bookmark).to.have.property('userId');
    });

    context('Check the Bookmark Model associations', () => {
      before(() => {
        bookmarks.associate({
          User,
        });
      });

      it('should have a belongsTo association with User Model', () => {
        expect(bookmarks.belongsTo.calledWith(User)).to.equal(true);
      });
    });

    context('Check the bookmark Model associations', () => {
      before(() => {
        bookmarks.associate({
          Articles,
        });
      });

      it('should have a belongsTo association with Articles Model', () => {
        expect(bookmarks.belongsTo.calledWith(Articles)).to.equal(true);
      });
    });
  });
});
