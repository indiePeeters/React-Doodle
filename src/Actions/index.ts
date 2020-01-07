import {Action} from  'redux';
import DailyUpdate from '../Models/DailyUpdate';
import Alert from '../Models/Alert';

export const FILE_UPLOADED = "FILEUPLOADED";
export const ADD_DAILY_UPDATE = "ADD_DAILY_UPDATE"
export const SET_DAILY_UPDATES = "SET_DAILY_UPDATES"
export const SET_ALERT = "SET_ALERT";


export interface AddDailyUpdateAction extends Action {
    type: typeof ADD_DAILY_UPDATE,
    dailyUpdate:  DailyUpdate
}

export interface SetDailyUpdatesAction extends Action {
    type: typeof SET_DAILY_UPDATES,
    dailyUpdates: DailyUpdate[]
}

export interface SetAlertAction extends Action {
    type: typeof SET_ALERT,
    alert: Alert
}

//Exporting these types for reducers
export type DailyUpdateActionTypes = AddDailyUpdateAction | SetDailyUpdatesAction;

export type AlertActionTypes = SetAlertAction 

//all available Actions must be mentioned here. use | operator.
export type AppActions =  DailyUpdateActionTypes | AlertActionTypes;