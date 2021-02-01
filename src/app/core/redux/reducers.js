// Import feature reducers to be included with application startup
// import userReducer from '~/features/login/redux/reducers';
// const featureReducers = { user: userReducer };

// if adding a reducer that is immer based (vs normal immutablejs based reducers)
// then prefix the feature name with 'immer_' this will ensure it is not converted to
// an immutable ordered map on rehydration and allows you to use pure js etc in your selectors
// eg:
// import userReducer from '~/features/login/redux/reducers';
// import immerTestFeatureReducer from '~/features/testImmer/redux/reducer';
// import immerAnotherTestFeatureReducer from '~/features/testImmerSecond/redux/reducer';
// const featureReducers = {
//   user: userReducer,
//   immer_testFeature: immerTestFeatureReducer,
//   immer_anotherTestFeature: immerAnotherTestFeatureReducer,
// };

const featureReducers = {};

export default { ...featureReducers };
