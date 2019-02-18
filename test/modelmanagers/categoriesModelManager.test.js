const { expect } = require('chai');
const categoriesModel = require('../../lib/modelManagers/categoriesModel');
const mockData = require('../mockData');

let res;
describe('Unit to Test category Model Manager', () => {
  after('Delete Tables', async () => {
    mockData.destroyData();
  });


  before(async () => {
    mockData.destroyData();
  });

  context('Test function that deletes catgories', () => {
    it('should delete a categoory', async () => {
      res = await categoriesModel.deleteCategory('tag');
      expect(res).to.be.equal(0);
    });
  });
});
