import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './containers';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "store";
import {createStore} from 'redux';
import allReducers from './reducers'
import 'bootstrap/dist/css/bootstrap.css';

const store=createStore(allReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const add= () =>{
//     return{
//         type: 'add1'
//     };
// };
//
// const sub= () =>{
//     return{
//         type: 'sub'
//     };
// };
//
//
// const counter =(state=0, action) => {
//     switch (action.type){
//         case 'add1':
//             return state+1;
//         case 'sub':
//             return state-1;
//     }
// };
//
// let store=createStore(counter);
 //store.subscribe(() => console.log(store.getState()));
//
 //store.dispatch(add());
// store.dispatch(add());
// store.dispatch(sub());



ReactDOM.render(
    <Provider store={store}>
  {/*<React.StrictMode>*/}
    <App />
    </Provider>,

  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
