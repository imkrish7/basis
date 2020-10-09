import { createStore, applyMiddleware } from 'redux'
import rootReducers from '../reducers'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
const initialState = { }

const store = () => createStore(rootReducers, initialState ,applyMiddleware(thunk, reduxImmutableStateInvariant()))

export default store;