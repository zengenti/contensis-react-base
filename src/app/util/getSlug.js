//basic helper function to convert text into-a-slug-like-this
const getSlug = text =>
  text
    .toLowerCase()
    .trim()
    .split(' ')
    .join('-');
export default getSlug;
