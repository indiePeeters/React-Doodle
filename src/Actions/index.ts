import {Action} from  'redux';
import DailyUpdate from '../Models/DailyUpdate/DailyUpdate';

export const FILE_UPLOADED = "FILEUPLOADED";
export const ADD_DAILY_UPDATE = "ADD_DAILY_UPDATE"
export const SET_DAILY_UPDATES = "SET_DAILY_UPDATES"



export interface AddDailyUpdateAction extends Action {
    type: typeof ADD_DAILY_UPDATE,
    dailyUpdate:  DailyUpdate
}

export interface SetDailyUpdatesAction extends Action {
    type: typeof SET_DAILY_UPDATES,
    dailyUpdates: DailyUpdate[]
}

//Exporting these types for reducers
export type DailyUpdateActionTypes = AddDailyUpdateAction | SetDailyUpdatesAction;

//all available Actions must be mentioned here. use | operator.
export type AppActions =  DailyUpdateActionTypes;