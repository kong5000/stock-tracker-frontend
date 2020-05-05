import React from 'react'
import './AllocationTable.css'

const AllocationTable = ({stocks, inputRefs}) => {
    const formatStockWeight = (stock) => {
        if (stock.targetWeight) {
            return Math.floor(stock.targetWeight * 100) + '%'
        }
        return 'Not Set'
    }

    return (
        <table className="allocation-form mb-3">
            <tbody>
                <tr>
                    <th className="info-header">Symbol</th>
                    <th className="info-header">Target</th>
                    <th className="info-header">New Target</th>
                </tr>
                {stocks.map((stock, index) =>
                    <tr>
                        <td><div>{stock.ticker}</div></td>
                        <td><div>{formatStockWeight(stock)}</div></td>
                        <td>
                            <input
                                ref={(inputElement) => inputRefs.current[index] = inputElement}
                                type="number"
                                min="0"
                                max="100"
                                defaultValue={stock.targetWeight * 100}
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default AllocationTable