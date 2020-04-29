import React from 'react'
import AssetTable from '../../../Content/AssetTable/AssetTable'
import LineChart from '../../../Content/Charts/LineChart/LineChart'
import PieChart from '../../../Content/Charts/PieChart/PieChart'

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
                        <div className="box my-custom-scrollbar box-container">
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