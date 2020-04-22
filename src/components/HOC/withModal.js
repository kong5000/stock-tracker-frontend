import React from 'react'
import { Modal } from 'react-bootstrap'

const withModal = (WrappedComponent) => {
    return props => (
        <Modal
            show={props.show}
            onHide={props.onHide}
            className="form-modal"
        >
            <Modal.Body className="form-modal">
                <WrappedComponent {...props} />
            </Modal.Body>
        </Modal>
    )
}

export default withModal
