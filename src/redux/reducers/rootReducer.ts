import { combineReducers } from "redux";

import counterReducer from "./counterReducer";

const rootReducer = combineReducers({
  todos: counterReducer,
});

export default rootReducer;
