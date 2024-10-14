import { useEffect, useState } from "react";
import "./AdminB.css";
import axios from "axios";
import WasteBarChart from './WasteBarChart'; // Import the BarChart component
import { FaStar } from 'react-icons/fa'; // Import FontAwesome stars
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function AdminDashBoard() {
    const [wasteStatistics, setWasteStatistics] = useState([]);
    const [topRatedRoutes, setTopRatedRoutes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStatistics = async () => {
            if (!token) {
                setError("No token found, please log in");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const responseStats = await axios.get("http://localhost:8080/api/admin/waste-statistics", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setWasteStatistics(responseStats.data);

                const responseRoutes = await axios.get("http://localhost:8080/api/admin/top-rated-routes", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setTopRatedRoutes(responseRoutes.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, [token]);

    const renderStars = (rating) => {
        const totalStars = 5;
        return [...Array(totalStars)].map((_, index) => (
            <FaStar key={index} color={index < rating ? '#ffc107' : '#e4e5e9'} />
        ));
    };

    const generateWasteStatisticsPDF = () => {
        const input = document.getElementById('waste-statistics-section');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.text('Waste Statistics Report', 10, 10);
            pdf.addImage(imgData, 'PNG', 10, 20, 200, 120); // Reduced width and height
            pdf.save('Waste_Statistics_Report.pdf');
        });
    };

    const generateTopRatedRoutesPDF = () => {
        const input = document.getElementById('top-rated-routes-section');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.text('Top Rated Routes Report', 10, 10);
            pdf.addImage(imgData, 'PNG', 10, 20, 220, 100); // Reduced width and height
            pdf.save('Top_Rated_Routes_Report.pdf');
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="dashboard">
                <h1>Waste Statistics Dashboard</h1>

                {/* Waste Statistics Section */}
                <div id="waste-statistics-section">
                    <div className="chart-container">
                        <WasteBarChart wasteStats={wasteStatistics}/>
                    </div>
                    <table className="narrow-table">
                        <thead>
                        <tr>
                            <th>Area</th>
                            <th>Total E-Waste</th>
                            <th>Total Food Waste</th>
                            <th>Total Recyclable Waste</th>
                            <th>Total Regular Waste</th>
                            <th>Total Weight (Kg)</th>
                            <th>Route Distance (km)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wasteStatistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.area}</td>
                                <td>{stat.eWaste}</td>
                                <td>{stat.foodWaste}</td>
                                <td>{stat.recyclableWaste}</td>
                                <td>{stat.regularWaste}</td>
                                <td>{stat.totalWeight}</td>
                                <td>{stat.routeDistance}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={generateWasteStatisticsPDF}>Download Waste Statistics PDF</button>

                {/* Top Rated Routes Section */}
                <h2>Top Rated Routes</h2>
                <div id="top-rated-routes-section">
                    <table className="top-rated-routes">
                        <thead>
                        <tr>
                            <th>Route Name</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topRatedRoutes.map((route, index) => (
                            <tr key={index}>
                                <td>{route.route}</td>
                                <td>{renderStars(route.rating)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={generateTopRatedRoutesPDF}>Download Top Rated Routes PDF</button>
            </div>
        </div>
    );
}

export default AdminDashBoard;
