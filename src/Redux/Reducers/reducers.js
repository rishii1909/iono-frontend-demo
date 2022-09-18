import { EXAMPLE_ACTION } from "../ActionTypes";


const default_state = {
  isLoggedIn : false,
  access_token : false,
  refresh_token : false,
  list_batch_runs : false,
  isLoading : false,
  exampleState : 0
}

export const main_reducer = (
  state = default_state,
  action
) => {
  switch (action.type) {
    case EXAMPLE_ACTION: {
      return {
        ...state,
        exampleState: state.exampleState + 1,
      };
    }
    default:
      return state;
  }
};