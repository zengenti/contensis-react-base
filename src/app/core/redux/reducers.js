// Import feature reducers to be included with application startup
// import userReducer from '~/features/login/redux/reducers';
// const featureReducers = { user: userReducer };

// if adding a reducer that is immer based (vs normal immutablejs based reducers)
// then put it in an object called immer and use normal combine reducers this will ensure it is not converted to
// an immutable ordered map on rehydration and allows you to use pure js etc in your selectors
// eg:
// import userReducer from '~/features/login/redux/reducers';
// import immerTestFeatureReducer from '~/features/testImmer/redux/reducer';
// import immerAnotherTestFeatureReducer from '~/features/testImmerSecond/redux/reducer';
// import { combineReducers } from 'redux';
// const featureReducers = {
//   user: userReducer,
//   immer: combineReducers({
//     testFeature: immerTestFeatureReducer,
//     anotherTestFeature: immerAnotherTestFeatureReducer,
//   }),
// };

const featureReducers = {};

export default { ...featureReducers };
