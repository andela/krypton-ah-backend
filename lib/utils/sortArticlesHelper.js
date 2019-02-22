/* eslint-disable no-nested-ternary */
const sort = (data) => {
  data.sort((a, b) => (b.createdAt > a.createdAt ? 1
    : (b.createdAt === a.createdAt)
      ? ((b.readStats.length < a.readStats.length) ? 1
        : -1) : -1));
  return data;
};

module.exports = sort;
