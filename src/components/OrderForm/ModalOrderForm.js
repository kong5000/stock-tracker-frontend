import React from 'react'
import OrderForm from './OrderForm'
import { Modal } from 'react-bootstrap'

const ModalOrderForm = ({ showForm, handleClose, onFormSubmit, selectedStock }) => {
    return (
        <Modal
            show={showForm}
            onHide={handleClose}>
            <Modal.Body>
                <OrderForm onSubmissionFinished={onFormSubmit} selectedStock={selectedStock} />
            </Modal.Body>
        </Modal>
    )
}

export default ModalOrderForm