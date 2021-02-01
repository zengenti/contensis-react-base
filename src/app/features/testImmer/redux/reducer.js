import { produce } from 'immer';

export default produce(
  (draftState, action) => {
    switch (action) {
      case 'GREETING_ACTION': {
        draftState.mytestProp = `hello ${action.name}`;
        return;
      }
      case 'GREETING_ACTION': {
        draftState.mytestProp = `hello ${action.name}`;
        return;
      }
    }
  },
  { mytestProp: 'hello', myTestObject: {a: 'the letter a', b: 'the letter b'} }
);
