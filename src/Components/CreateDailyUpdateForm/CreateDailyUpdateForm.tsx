import React, { ChangeEvent, useState, useEffect } from 'react';
import Dropzone from './Dropzone/Dropzone';
import DailyUpdate from '../../Models/DailyUpdate/DailyUpdate'
import DailyUpdateService from '../../Services/DailyUpdateService'
import './CreateDailyUpdateForm.css'
import { AppState, store } from '../../Store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../Actions';
import { startAddDailyUpdate, startSetDailyUpdates } from '../../Actions/DailyUpdateAction';
import { connect } from 'react-redux';

//React bootstrap components
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


interface CreateDailyUpdateFormProps{
}

interface CreateDailyUpdateFormState {
    file : File;
}

type Props = CreateDailyUpdateFormProps & LinkStateProps & LinkDispatchProps;

const CreateDailyUpdateForm = (props: Props, state : CreateDailyUpdateFormState) => {
    const [dailyUpdate, setDailyUpdate] = useState<DailyUpdate>(new DailyUpdate("", new File([],"",undefined), ""));

    function OnFileUploaded(uploadedFiles : Array<File>){
        setDailyUpdate(new DailyUpdate(dailyUpdate.id, uploadedFiles[0], dailyUpdate.message))
        props.startAddDailyUpdate(dailyUpdate);
    }

    function OnMessageChanged(event : ChangeEvent<HTMLInputElement>){
        setDailyUpdate(new DailyUpdate(dailyUpdate.id, dailyUpdate.photo, event.target.value))
        props.startAddDailyUpdate(dailyUpdate);
    }

    return(
        <div className="CreateMessage">
                <div>
                    <Dropzone disabled={false} onFilesAdded={OnFileUploaded}/>
                </div>
                <div>
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={OnMessageChanged}
                        placeholder="message"
                        aria-label="message"
                    />
                </InputGroup>
                </div>
        </div>
    )
}
interface LinkStateProps {
    dailyUpdate : DailyUpdate,
}

interface LinkDispatchProps {
    startAddDailyUpdate: (dailyUpdate : DailyUpdate) => void;
}

const mapStateToProps = (state : AppState, ownProps : CreateDailyUpdateFormProps)  : LinkStateProps=> ({
    dailyUpdate: state.dailyupdateState.dailyUpdate
});

const mapDispatchToProps = (dispatch :  ThunkDispatch<any, any, AppActions> , ownProps : CreateDailyUpdateFormProps) : LinkDispatchProps => ({
    startAddDailyUpdate: (data: { photo: Blob; message: String; }) => dispatch(startAddDailyUpdate(data))
});

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(CreateDailyUpdateForm)
