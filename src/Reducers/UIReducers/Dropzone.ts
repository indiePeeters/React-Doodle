import DailyUpdate from '../../Models/DailyUpdate/DailyUpdate'

export interface DropzoneState {
    file : File,
    placeholder : string
}

export function defaultDropzoneState() : DropzoneState {
    return {
        file: new File([],"",undefined),
        placeholder: "Please Upload a file"
    }
}