import { AppState } from "../Store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import Modal from "../Components/Modal";

import CreateDailyUpdateForm from './CreateDailyUpdateForm/CreateDailyUpdateForm';
import React, { useState, useEffect, ChangeEvent } from "react";
import DailyUpdateService from "../Services/DailyUpdateService";

//Store
import { connect } from "react-redux";
import { AppActions } from "../Actions";

import DailyUpdate from "../Models/DailyUpdate";
import Alert from "../Models/Alert";
import { startSetAlert } from "../Actions/AlertAction";
import { startAddDailyUpdate, startSetDailyUpdates } from "../Actions/DailyUpdateAction"

//React Bootstrap
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

interface CreateDailyUpdatePageProps {
    
}


type Props = CreateDailyUpdatePageProps & LinkStateProps & LinkDispatchProps;

const CreateDailyUpdatePage = (props: Props) => {
    //Variables
    var dailyUpdateService : DailyUpdateService = new DailyUpdateService();

    //Hooks
    const [showModal, setShowModal] = useState(false);
    const [dailyUpdates, setDailyUpdate] = useState<DailyUpdate[]>([]);
    const [filter, setFilter] = useState<string>("");

    //Async effect
    useEffect(() => {
        const fetchData = async () => {
            const result = await dailyUpdateService.GetAllDailyUpdates();
            setDailyUpdate(result);
            props.startSetDailyUpdates(result);
        }
        fetchData();
    }, []);

    //methods
    async function OnDailyUpdateSend(){
        let result = await dailyUpdateService.SaveDailyUpdate(props.dailyUpdate);
        console.log(result);
        setDailyUpdate(props.dailyUpdates);
        dailyUpdates.push(result);
        props.startSetDailyUpdates(dailyUpdates);
        props.startSetAlert(new Alert(result.message));
    }

    function onFilterChanged(event: ChangeEvent<HTMLInputElement>){
        setFilter(event.target.value);
    }

    function toggleModal(){
        if(!showModal){
            setShowModal(true);
        } else setShowModal(false);
    }
    
    //render
    return (
        <div>
            <Container className="mt-5 mb-5">
                
                <Row>
                    <Col className="col-10">
                        <Breadcrumb> 
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item>indie's message hub</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col className="col-2">
                        <Button onClick={toggleModal}>Add DailyUpdate</Button>
                    </Col>
                </Row>
            </Container>
            <InputGroup className="mb-3">
                    <FormControl
                        onChange={onFilterChanged}
                        placeholder="filter"
                        aria-label="message"
                    />
                </InputGroup>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyUpdates.filter(d => d.message.includes(filter) || d.id.includes(filter)).map((dailyupdate) => 
                        <tr key={dailyUpdates.indexOf(dailyupdate)} >
                            <td>{dailyupdate.id}</td>
                            <td>{dailyupdate.message}</td>
                            {/*<td><Image src={"data:image/png;base64, " + dailyupdate.photo.toString()}/> </td>*/}
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal onSaveClick={OnDailyUpdateSend} saveBtnText="Send" toggleModal={toggleModal} show={showModal} children={<CreateDailyUpdateForm />}></Modal>
        </div>
    );
}

interface LinkStateProps {
    dailyUpdate: DailyUpdate
    dailyUpdates: DailyUpdate[]
    alert: Alert
}

interface LinkDispatchProps {
    startAddDailyUpdate: (dailyUpdate : DailyUpdate) => void;
    startSetDailyUpdates: (dailyupdates : DailyUpdate[]) => void;
    startSetAlert: (Alert : Alert) => void;
}

const mapStateToProps = (state : AppState, ownProps : CreateDailyUpdatePageProps)  : LinkStateProps=> ({
    dailyUpdate: state.dailyupdateState.dailyUpdate,
    dailyUpdates: state.dailyupdateState.dailyUpdates,
    alert: state.alertState.alert
});

const mapDispatchToProps = (dispatch :  ThunkDispatch<any, any, AppActions> , ownProps : CreateDailyUpdatePageProps) : LinkDispatchProps => ({
    startSetDailyUpdates: (data: DailyUpdate[]) => dispatch(startSetDailyUpdates(data)),
    startAddDailyUpdate: (data: { photo: Blob | string; message: string; }) => dispatch(startAddDailyUpdate(data)),
    startSetAlert: (data : {message : string}) => {
        dispatch(startSetAlert(data))
        alert(data.message)    
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateDailyUpdatePage)
