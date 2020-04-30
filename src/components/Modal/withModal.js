import React from 'react'
import { Modal } from 'react-bootstrap'
import './Modal.css'

const withModal = (WrappedComponent) => {
    return props => (
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Body className="modal-content">
                <WrappedComponent {...props} />
            </Modal.Body>
        </Modal>
    )
}

export default withModal
