const slugify = require('slugify');


const generateSlug = (title, id) => {
  const slug = slugify(title, '-');
  const slugs = { slug: `${slug}${id}` };
  return { slugs };
};
module.exports = generateSlug;
