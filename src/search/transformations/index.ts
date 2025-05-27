import { Mappers } from '../models/Search';
import mapStateToSearchUri from './state-to-searchuri';

export default {
  results: entries => entries,
  navigate: mapStateToSearchUri,
} as Mappers;
