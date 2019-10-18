//*** Dependancies ***//
//export any dependancies here.
//import into feature components import { Component, Function, etc. } from '../'
export {
  formatDate,
  formatKnobDate,
  generateLoremIpsum,
  getEntryLink,
  getIn,
  getSVG,
  mapImageComponent,
  toCamelCase,
  Container,
  Image,
  Link,
  VisuallyHidden,
} from '~/features/global';

export { default as Paging } from '~/features/paging';

//component entrypoint can either be a dumb component or a container
//can then be imported to main app / page template eg. import Component from ~/features/featureName
import SearchResults from './containers/SearchResults.container';
export default SearchResults;

//export searchbar
export { default as Searchbar } from './components/Searchbar';

export { default as reducer } from './redux/reducers';
export { searchSagas as sagas } from './redux/sagas';
