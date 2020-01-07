import DailyUpdate from "../Models/DailyUpdate";
import Service from "./Service"
import * as request from "superagent";

class DailyUpdateService implements Service{

    private baseURL : string | undefined = process.env.MESSAGE_API_URL;
    private authToken : string | undefined;

    constructor (_authToken?: string) {
        this.authToken = _authToken;
    }

    public async GetAllDailyUpdates() : Promise<DailyUpdate[]> {
        var dayUpdate : DailyUpdate[] = [];
        await request.get('/api/DayUpdate').withCredentials().then(res => {
            res.body.forEach((jsonDayUpdate: { id: string; file: string; message: string; }) => {
                dayUpdate.push(new DailyUpdate(jsonDayUpdate.id, jsonDayUpdate.file, jsonDayUpdate.message))
            });
            return dayUpdate;
        }).catch(function(errors)
        {
            throw new Error(errors);
        });
        return dayUpdate;
    }

    // public GetDailyUpdateById(id : string) : DailyUpdate {

    // }

    public async SaveDailyUpdate(dailyupdate : DailyUpdate) :  Promise<DailyUpdate> {
        var receivedDailyUpdate : DailyUpdate = new DailyUpdate("", new File([],"", undefined) , "");

        let formdata = new FormData();
        formdata.append("photo", dailyupdate.photo);
        formdata.append("message", dailyupdate.message );

        var result = await request.post('/api/DayUpdate').send(formdata);
        receivedDailyUpdate = new DailyUpdate(result.body.id, result.body.photo, result.body.message);
        return receivedDailyUpdate;
    }

    // public UpdateDailyUpdate(dailyupdate : DailyUpdate) : DailyUpdate {

    // } 
}

export default DailyUpdateService;