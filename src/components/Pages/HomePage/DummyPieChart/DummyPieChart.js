import React from 'react'
import Chart from "react-apexcharts"

const DummyPieChart = () => {
    const exampleData = [100, 100, 100]

    const chartOptions = {
        chart: {
            type: 'pie'
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        seriesLabels: {
            enabled: false
        },
        tooltip: { enabled: false },
    }

    return (
        <Chart
            options={chartOptions}
            series={exampleData}
            type="pie"
            width="500">
        </Chart>
    )
}

export default DummyPieChart