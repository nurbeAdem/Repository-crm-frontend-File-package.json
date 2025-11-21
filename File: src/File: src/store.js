import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import leadsReducer from './features/leads/leadsSlice';


const rootReducer = combineReducers({ leads: leadsReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
