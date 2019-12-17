import { DailyUpdateState } from "../../Store/DailyUpdateInterface";
import { DailyUpdateActionTypes } from "../../Actions";

export const initialState: DailyUpdateState = { dailyUpdate: { id: "0", photo: new File([],"fgh",undefined), message: "Reducer" }, dailyUpdates: [] };

const dailyUpdateReducer = (state = initialState, action : DailyUpdateActionTypes) : DailyUpdateState => {
    switch(action.type){
        case "ADD_DAILY_UPDATE": {
            return {... state, dailyUpdate: action.dailyUpdate };
        }
        case "SET_DAILY_UPDATES": {
            return {... state, dailyUpdates: action.dailyUpdates };
        }
        default:
            return initialState;
    }
}
export {dailyUpdateReducer}