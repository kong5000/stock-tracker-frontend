import React from 'react'
import AllocationForm from './AllocationForm'
import { Modal } from 'react-bootstrap'

const ModalAllocationForm = ({ showForm, handleClose, onFormSubmit, stocks }) => (
    <Modal
        show={showForm}
        onHide={handleClose}
        className="form-modal">
        <Modal.Body className="form-modal">
            <AllocationForm
                stocks={stocks}
                onFormSubmit={onFormSubmit}
            />
        </Modal.Body>
    </Modal>
)

export default ModalAllocationForm