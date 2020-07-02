import { createStore } from "redux";
import rotateReducer from "reducers/rotateReducer";

function configureStore(state = { rotating1: true }) {
    return createStore(rotateReducer,state);
}

export default configureStore;