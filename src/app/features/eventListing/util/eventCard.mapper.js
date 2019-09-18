//expects a json object from the delivery api for an entry
//returns an object of props to pass to the component
export function eventCardMapper() {
  return {
    date: '2018-03-12T00:00:00',
    description: 'This is a description',
    imageAlt: 'Image alt text',
    imagePath: '/path-to-image.jpg',
    location: 'Location name',
    title: 'This is a title',
    uri: '/path-to-page',
  };
}
