# redux-simple-summary

It seems like every blog post about Redux is thousands of words when I'm only looking for a dead simple example of the logic process to refer to while I build my apps. Thus, I created this crazy simple summary. Feel free to update and critique as necessary.
 
**Redux** - Hold and update the entire state of the app in the simplest manner possible while also using the least amount of boilerplate code.
 
**Actions** - Pure object that is returned by a pure function with no side-effects. The action object contains the “type” and any necessary information to perform it. It does not actually do anything, it just defines the action and passes the necessary data. The object is sent to the store using dispatch(). Actions describe that something happened.
 
**Reducer** - A pure function that takes the current state and action, and performs the update on the state. It returns the new state. Typically use a switch statement that reads the action.type and then creates the new state this action.
 
**Store** - There is only one and it holds the entire state in a single object. Assign it to a variable using createStore(combinedReducer). The store passes two arguments to the reducer.
 
**Flow:**

1. Interaction requires an update

2. Call store.dispatch(action)

3. Redux store calls the reducer

4. The root reducer may combine the output of multiple reducers into a single state tree

5. The Redux store saves the complete state tree returned by the root reducer

6. The components are "subscribed" through the connect function and updated accordingly
