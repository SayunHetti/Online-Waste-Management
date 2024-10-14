import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary components from Chart.js
ChartJS.register(
    CategoryScale, // For x-axis categories
    LinearScale,   // For the y-axis linear scale
    BarElement,    // For the bar chart element
    Title,         // For chart titles
    Tooltip,       // For tooltips
    Legend         // For the chart legend
);

import PropTypes from 'prop-types'; // Import PropTypes

const WasteBarChart = ({ wasteStats }) => {
    const data = {
        labels: wasteStats.map(stat => stat.area),
        datasets: [
            {
                label: 'E-Waste',
                data: wasteStats.map(stat => stat.eWaste),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Food Waste',
                data: wasteStats.map(stat => stat.foodWaste),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Recyclable Waste',
                data: wasteStats.map(stat => stat.recyclableWaste),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Regular Waste',
                data: wasteStats.map(stat => stat.regularWaste),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    return <Bar data={data} />;
};

// Add prop types validation
WasteBarChart.propTypes = {
    wasteStats: PropTypes.arrayOf(
        PropTypes.shape({
            area: PropTypes.string.isRequired,
            eWaste: PropTypes.number.isRequired,
            foodWaste: PropTypes.number.isRequired,
            recyclableWaste: PropTypes.number.isRequired,
            regularWaste: PropTypes.number.isRequired
        })
    ).isRequired
};

export default WasteBarChart;