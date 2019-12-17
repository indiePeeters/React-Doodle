import DailyUpdate from "../Models/DailyUpdate/DailyUpdate";
import Service from "./Service"
import * as request from "superagent";

class DailyUpdateService implements Service{

    private baseURL : string | undefined = process.env.MESSAGE_API_URL;
    private authToken : string | undefined;

    constructor (_authToken?: string) {
        this.authToken = _authToken;
    }

    b64toBlob = (base64 : String, type = 'application/octet-stream') => 
        fetch(`data:${type};base64,${base64}`).then(res => res.blob())

    public async GetAllDailyUpdates() : Promise<DailyUpdate[]> {
        var dayUpdate : DailyUpdate[] = [];
        await request.get('/api/DayUpdate').withCredentials().then(res => {
            res.body.forEach((jsonDayUpdate: { id: String; photo: String; message: String; }) => {
                this.b64toBlob(jsonDayUpdate.photo).then(blob => (
                    dayUpdate.push(new DailyUpdate(jsonDayUpdate.id, blob, jsonDayUpdate.message))
                ));                   
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
        var dayUpdate : DailyUpdate = new DailyUpdate("", new File([],"", undefined) , "");
        await request.post('/api/DayUpdate').send({ photo: dailyupdate.photo, message: dailyupdate.photo, } ).then(res =>{
            res.body.forEach((jsonDayUpdate: { id: String; photo: String; message: String; }) => {
                this.b64toBlob(jsonDayUpdate.photo).then(blob => (
                    dayUpdate = new DailyUpdate(jsonDayUpdate.id, blob, jsonDayUpdate.message)
                ));                   
            });
            return dayUpdate;
        }).catch(function(errors)
        {
            throw new Error(errors);
        });
        return dayUpdate;
    }

    // public UpdateDailyUpdate(dailyupdate : DailyUpdate) : DailyUpdate {

    // } 
}

export default DailyUpdateService;