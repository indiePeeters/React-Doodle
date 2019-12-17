import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalContainer from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import React, { useState, Component, ReactNode } from 'react';



interface ModalProps{
    children : JSX.Element;
    show: boolean;
    saveBtnText: String;
    toggleModal: () => void;
    onSaveClick: () => void;
}


interface ModalState {
}

type Props = ModalProps



const Modal = (props: Props) => {
    return(
        <div>
            <ModalContainer show={props.show}>
                <ModalHeader>
                    <ModalTitle>Create new DailyUpdate</ModalTitle>
                    <button type="button" className="close" onClick={props.toggleModal}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                </ModalHeader>

                <ModalBody>
                    <Container className="row d-flex justify-content-center">
                        {props.children}
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={props.toggleModal} variant="secondary">Close</Button>
                    <Button onClick={props.onSaveClick} variant="primary">{props.saveBtnText}</Button>
                </ModalFooter>
            </ModalContainer>
        </div>
    );
}
export default Modal;


