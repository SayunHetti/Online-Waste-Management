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
                backgroundColor: 'rgba(51, 153, 0, 0.2)', // Light green
                borderColor: 'rgba(51, 153, 0, 1)', // Dark green
                borderWidth: 1
            },
            {
                label: 'Food Waste',
                data: wasteStats.map(stat => stat.foodWaste),
                backgroundColor: 'rgba(102, 204, 102, 0.2)', // Light green
                borderColor: 'rgba(102, 204, 102, 1)', // Darker green
                borderWidth: 1
            },
            {
                label: 'Recyclable Waste',
                data: wasteStats.map(stat => stat.recyclableWaste),
                backgroundColor: 'rgba(153, 255, 102, 0.2)', // Lighter green
                borderColor: 'rgba(153, 255, 102, 1)', // Darker green
                borderWidth: 1
            },
            {
                label: 'Regular Waste',
                data: wasteStats.map(stat => stat.regularWaste),
                backgroundColor: 'rgba(204, 255, 153, 0.2)', // Light green
                borderColor: 'rgba(204, 255, 153, 1)', // Darker green
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
