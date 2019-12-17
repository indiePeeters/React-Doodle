import {MaxLength, IsNotEmpty} from "class-validator";

class DailyUpdate{
    
    public id : String;
    
    @IsNotEmpty()
    public photo : Blob;

    @MaxLength(100,{ message: "the message is too long" })
    @IsNotEmpty()
    public message : String;

    constructor(id: String , photo : Blob, message : String){
        this.id = id;
        this.photo = photo;
        this.message = message;
    }
    
}
export default DailyUpdate;