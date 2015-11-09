// credit to renren89 -> https://gist.github.com/renren89/d3906f2498d127ee6c96

// These are the action.types that will be passed with the action to indicate which switch statement to use
// Usually kept in its own file -> ActionTypes.js
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
//------------------------------------------------------------------------------

// Actions.js - this uses functions that declare the type and data to be passed

// Not necessary all the time to have constants if the app is small as it is often noted in a lot of flux offerings
// This allows for consistency in case you messed up somewhere it is better to find out where in larger apps

// import { INCREASE, DECREASE } from '../constants/actiontypes';

const increase = () => {
  return {
    type: 'INCREASE'
  }
}
// The type isn't necessarily a requirement but I wouldn't recommend actions without it
// In reducer parameters you receive something along the lines of
/*
  const reducer = (state = 0, action) { // It'll kind of look something like this reducer = (state = 0, increase() )
                                        // where the action is a callback 
    switch(action.type) {  // And this is where action.type = INCREASE which is set to the value of 'INCREASE' if you used constants
      case INCREASE: {
        return state + 1;
      }
    }
  }
*/

//
const decrease = () => {
  return {
    type: 'DECREASE'
  }
}

//------------------------------------------------------------------------------
// import { increase, decrease } from '../actions/actions';

// You probably don't name your reducers, reducer but in this example it made it visually easier to map in my head.
const reducer = (state = 0, action) => {
  console.log('current state is ', state, 'and action is ', action);

  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
      // If you don't return the new state then nothing gets sent.
  }
}

//------------------------------------------------------------------------------

// App.jsx
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import { increase, decrease } from '../actions/actions';  -> You want to import the actions you will want to dispatch


class App extends Component {
  render() {
    const { counter, dispatch } = this.props;
    console.log(this.props);
    // counter from the connect(select) and dispatch by default from connect
    return (
      <div>
        <span>{counter}</span>
        <button onClick={ () => dispatch(increase())}>Increase</button>
        <button onClick={ () => dispatch(decrease())}>Decrease</button>
      </div>
      // The onClick triggers a function that returns the dispatch function which in turn calls another function, your action:
        /*
          const increase = () => {
            return {
              type: 'INCREASE'
            }
          }
        */


      // more so than not you will often pass arguments within these functions and return it gets passed to the actions

    );
  }

}

const select = (state) => {
  return {
    counter: state
  }
}
// The above function maps the state to props.  So the reducer returns the new state, but the idea is to not have components carry
// any state.  This means you take the new state provided by the reducer("provided" through "connect") and return it as props.
// notice the returned object counter?  That becomes similar to this.props.counter providing the new state as it's value.

connect(select)(App);
// This is one alternative to using the connect function from react-redux.   You may have seen the @connect decorator but they
// often choose this route as dectorators can still change in possible future


//------------------------------------------------------------------------------

// import React from 'react';
import { render } from 'react-dom';
// import App from './components/App';
// import reducer from './reducers/Reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(reducer);
// The store is created with createStore and it only takes in one reducer so you will have to use combine reducer
// if your reducer has more than one reducer.

let rootElement = document.getElementById('root');

render (
  <Provider store={store}>
    <App />
  </Provider>, rootElement
);
// Provider "provides" the store to the component you want be enclosing them in the { Provider } component from react-redux
// This means that the App component, a top level component, doesn't actually carry any state since it just takes
// the state from the store that was returned by the reducer and then converted through connect's map to state connect(select) from App.jsx

// If you look at App.jsx, this.props.dispatch would be similar to store.dispatch if they were on the same file