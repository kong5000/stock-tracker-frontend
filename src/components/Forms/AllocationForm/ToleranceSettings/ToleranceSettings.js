import React from 'react'

const ToleranceSettings = ({threshold, onToleranceChange, tolerance}) => {
    return (
        <div>
            <h4>Tolerance</h4>
            <div clasName="row">
                <div className="col-12 mb-2">
                    Current Tolerance +-{threshold}%
            </div>
                <div className="col-12">
                    <input
                        className="allocation-input"
                        type="number"
                        min="0"
                        max="100"
                        value={tolerance}
                        onChange={onToleranceChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ToleranceSettings