import { createStore, combineReducers, applyMiddleware } from 'redux';
import { dailyUpdateReducer } from  '../Reducers/DataReducers/DailyUpdate'
import thunk, { ThunkMiddleware } from "redux-thunk"
import { AppActions } from '../Actions';

export const rootReducer = combineReducers({
    dailyupdateState: dailyUpdateReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState,AppActions>));