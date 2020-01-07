import { Dispatch } from "redux";
import { AppState } from "../Store/configureStore";
import { AppActions, ADD_DAILY_UPDATE, SET_DAILY_UPDATES } from "../Actions";
import uuid from "uuid";
import DailyUpdate from "../Models/DailyUpdate";

export const AddDailyUpdate = (dailyUpdate : DailyUpdate) : AppActions => ({
    type: ADD_DAILY_UPDATE,
    dailyUpdate
});

export const SetDailyUpdates = (dailyUpdates : DailyUpdate[]) : AppActions => ({
    type: SET_DAILY_UPDATES,
    dailyUpdates
});

export const startAddDailyUpdate = (dailyUpdateData : { photo : Blob | string; message : string }) => {
    return (dispatch : Dispatch<AppActions>, getState: () => AppState) => {
        const id = uuid();
        const dailyUpdate : DailyUpdate = {id, photo: dailyUpdateData.photo, message: dailyUpdateData.message}; 
        dispatch(
            AddDailyUpdate(dailyUpdate)
        );      
    };
}

export const startSetDailyUpdates = (dailyupdatesData : Array<DailyUpdate>) => {
    return (dispatch : Dispatch<AppActions>, getState : () => AppState) => {
        
        dispatch(
            SetDailyUpdates(dailyupdatesData)
        );
    }
}