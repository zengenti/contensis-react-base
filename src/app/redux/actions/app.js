import { action } from 'app/util/helpers';
import { APP_INITIALISE } from '../types/app';

export const initialiseApp = () => action(APP_INITIALISE);
