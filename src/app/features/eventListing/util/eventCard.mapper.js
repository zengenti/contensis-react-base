//expects a json object from the delivery api for an entry
//returns an object of props to pass to the component
export function eventCardMapper(entry) {
  const imageAlt = entry.image && entry.image.altText;
  const imagePath =
    entry.image && entry.image.asset && entry.image.asset.sys.uri;
  return {
    date: '2018-03-12T00:00:00',
    description: 'This is a description',
    imageAlt: imageAlt,
    imagePath: imagePath,
    location: 'Location name',
    title: entry.title,
    uri: '/path-to-page',
  };
}
