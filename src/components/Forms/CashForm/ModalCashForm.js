import React from 'react'
import CashForm from './CashForm'
import { Modal } from 'react-bootstrap'

const ModalCashForm = ({ showForm, handleClose, onFormSubmit, currentCash }) => (
    <Modal
        show={showForm}
        onHide={handleClose}
        className="form-modal"
        onFormSubmit={onFormSubmit}
    >
        <Modal.Body className="form-modal">
            <CashForm
                currentCash={currentCash}
                onFormSubmit={onFormSubmit}
            />
        </Modal.Body>
    </Modal>
)

export default ModalCashForm