import { Reducer } from 'redux';
import { Effect } from 'redux-saga/effects';
import { reduxStore as DefaultStore } from '../store';
import { injectReducer, injectSaga } from './inject';

export const injectRedux = (
  { key, reducer, saga }: { key: string; reducer?: Reducer; saga?: Effect[] },
  store = DefaultStore
) => {
  // console.info('injectRedux, key: ', key);
  if (reducer) injectReducer({ key, reducer }, store);
  if (saga) injectSaga({ key, saga }, store);
};

export const useInjectRedux = injectRedux;
