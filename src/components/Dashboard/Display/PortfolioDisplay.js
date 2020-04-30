import React from 'react'
import AssetTable from './AssetTable/AssetTable'
import LineChart from './LineChart/LineChart'
import PieChart from './PieChart/PieChart'

const PortfolioDisplay = ({assets, chartClick, selectedStock, tableRowClicked}) => {
    return (
        <div id="asset-page-container">
                <div className="top-row">
                    <div className="pie-chart-container box-container">
                        <PieChart assets={assets} chartClick={chartClick} />
                    </div>
                    <div className="line-chart-container box-container">
                        <LineChart stock={selectedStock} />
                    </div>
                </div>
                <div className="bottom-row">
                        <div className="box asset-table-container box-container">
                            <AssetTable
                                assets={assets}
                                className="asset-table"
                                tableRowClicked={tableRowClicked}
                            />
                        </div>
                </div>
        </div>
    )
}

export default PortfolioDisplay