import { produce } from 'immer';

export default produce(
  (draftState, action) => {
    switch (action) {
      case 'GREETING_ACTION': {
        draftState.mytestProp = `hello ${action.name}`;
        return;
      }
    }
  },
  { mytestProp: 'hello this is a 2nd immer feature' }
);
