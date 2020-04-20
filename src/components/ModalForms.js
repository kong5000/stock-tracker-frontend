import React from 'react'
import ModalAllocationForm from './ModalAllocationForm'
import ModalCashForm from './ModalCashForm'
import ModalOrderForm from './OrderForm/ModalOrderForm'

const ModalForms = ({
    handleModalClose,
    onFormSubmit,
    selectedStock,
    assets,
    showOrderForm,
    showAllocationForm,
    showCashForm
}) => (
        <>
            <ModalOrderForm
                showForm={showOrderForm}
                handleClose={handleModalClose}
                onFormSubmit={onFormSubmit}
                selectedStock={selectedStock} />
            <ModalAllocationForm
                showForm={showAllocationForm}
                handleClose={handleModalClose}
                onFormSubmit={onFormSubmit}
                stocks={assets.stocks}
            />
            <ModalCashForm
                showForm={showCashForm}
                handleClose={handleModalClose}
                onFormSubmit={onFormSubmit}
                currentCash={assets.cash} />
        </>
    )

export default ModalForms