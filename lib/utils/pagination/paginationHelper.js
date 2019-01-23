const { LIMIT, OFFSET } = require('../../../constants/index');

const paginate = (query) => {
  if (query.limit || query.offset) {
    if (query.limit <= 0 || query.offset <= 0) {
      const page = OFFSET;
      const limit = LIMIT;
      const offset = limit * (page - 1);

      return { limit, offset };
    }
    if (!Number(query.limit) || !Number(query.offset)) {
      const page = parseInt(query.offset, 10) || OFFSET;
      const limit = parseInt(query.limit, 10) || LIMIT;
      const offset = limit * (page - 1);

      return { limit, offset };
    }
    const page = parseInt(query.offset, 10);
    const limit = parseInt(query.limit, 10);
    const offset = limit * (page - 1);

    return { limit, offset };
  }
  const page = OFFSET;
  const limit = LIMIT;
  const offset = limit * (page - 1);
  return { limit, offset };
};
module.exports = paginate;
