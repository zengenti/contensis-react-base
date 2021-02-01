import { produce } from 'immer';

export default produce(
  (draftState, action) => {
    switch (action) {
      case 'GREETING_ACTION': {
        draftState.myTestProp = `hello ${action.name}`;
        return;
      }
      case 'UPDATE_TEST_OBJ_A': {
        draftState.myTestObject.a = `the letter ${action.letter}`;
        return;
      }
    }
  },
  {
    myTestProp: 'hello',
    myTestObject: { a: 'the letter a', b: 'the letter b' },
  }
);
