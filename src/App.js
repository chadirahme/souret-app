//import React from 'react';
import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { connect, useSelector,useDispatch } from "react-redux";
import { startAction } from "actions/startAction";
import { stopAction } from "actions/stopAction";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {add,sub} from './actions'

class App extends Component {
    render() {
        return (
            <h1>Fake page</h1>
        )
    }
}

export default App;


//
// function App(){
//
//     const count = useSelector(state => state.mycounter);
//     const props = useSelector(state => state.routerReducer);
//     const dispatch= useDispatch();
//
//
//
//         return (
//             <div className="App">
//               <header className="App-header">
//                   {/*<img src={logo} className="App-logo" alt="logo" />*/}
//
//                   <h1>counter {count}</h1>
//                   <button onClick={() => dispatch(startAction(5))}>+</button>
//                   <button onClick={() => dispatch(stopAction())}>+</button>
//
//
//
//                 <img
//                     src={logo}
//                     className={
//                         "App-logo" +
//                         (props.rotating ? "" : "-paused")
//                     }
//                     alt="logo"
//                     onClick={()=> props.rotating ? dispatch(stopAction()) : dispatch(startAction()) }
//                         // props.rotating ?
//                         //     ()=>dispatch(props.stopAction) : ()=>dispatch(props.startAction)
//                     //}
//                 />
//
//
//                 <p>
//                   Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                   Learn React
//                 </a>
//               </header>
//             </div>
//         );
// }
// export default App;
