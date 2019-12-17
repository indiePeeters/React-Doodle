import { connect } from "react-redux";
import { startAddDailyUpdate, startSetDailyUpdates } from "../Actions/DailyUpdateAction"
import DailyUpdate from "../Models/DailyUpdate/DailyUpdate";
import { AppState } from "../Store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../Actions";
import Modal from "../Components/Modal";
import CreateDailyUpdateForm from './CreateDailyUpdateForm/CreateDailyUpdateForm';
import React, { useState, useEffect } from "react";
import DailyUpdateService from "../Services/DailyUpdateService";

//React Bootstrap
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

interface CreateDailyUpdatePageProps {
    
}

type Props = CreateDailyUpdatePageProps & LinkStateProps & LinkDispatchProps;

const CreateDailyUpdatePage = (props: Props) => {
    //Variables
    var dailyUpdateService : DailyUpdateService = new DailyUpdateService();

    //Hooks
    const [showModal, setShowModal] = useState(false);
    const [dailyUpdates, setDailyUpdate] = useState<DailyUpdate[]>([]);
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
    function OnDailyUpdateSend(){
        dailyUpdateService.SaveDailyUpdate(props.dailyUpdate).then((res : DailyUpdate) => {
            setDailyUpdate(props.dailyUpdates);
            dailyUpdates.push(res);
            props.startSetDailyUpdates(dailyUpdates);
        });
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
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Message</th>
                        <th>photo</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyUpdates.map((dailyupdate) => 
                        <tr>
                            <td>{dailyupdate.id}</td>
                            <td>{dailyupdate.message}</td>
                            <td><Image src="{dailyupdate.photo}"/> </td>
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
}

interface LinkDispatchProps {
    startAddDailyUpdate: (dailyUpdate : DailyUpdate) => void;
    startSetDailyUpdates: (dailyupdates : DailyUpdate[]) => void;
}

const mapStateToProps = (state : AppState, ownProps : CreateDailyUpdatePageProps)  : LinkStateProps=> ({
    dailyUpdate: state.dailyupdateState.dailyUpdate,
    dailyUpdates: state.dailyupdateState.dailyUpdates
});

const mapDispatchToProps = (dispatch :  ThunkDispatch<any, any, AppActions> , ownProps : CreateDailyUpdatePageProps) : LinkDispatchProps => ({
    startSetDailyUpdates: (data: DailyUpdate[]) => dispatch(startSetDailyUpdates(data)),
    startAddDailyUpdate: (data: { photo: Blob; message: String; }) => dispatch(startAddDailyUpdate(data))    
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateDailyUpdatePage)
