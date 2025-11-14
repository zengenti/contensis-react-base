import { Effect } from 'redux-saga/effects';
export declare const wrapSagasInGenerator: (sagas: Effect[] | (() => Generator)) => () => Generator;
