const filterNullFromObject = obj => Object.keys(obj).reduce((update, key) => {
  if (obj[key]) {
    update[key] = obj[key];
  }
  return update;
}, {});

const getUserProfileFromRequest = req => filterNullFromObject(req.body);

module.exports = {
  filterNullFromObject,
  getUserProfileFromRequest
};
