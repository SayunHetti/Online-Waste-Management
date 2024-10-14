import { useEffect, useState } from "react";
import "./AdminB.css";
import axios from "axios";
import WasteBarChart from './WasteBarChart'; // Import the BarChart component

function AdminDashBoard() {
    const [wasteStatistics, setWasteStatistics] = useState([]);
    const [topRatedRoutes, setTopRatedRoutes] = useState([]); // State for top-rated routes
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
                // Fetch waste statistics
                const responseStats = await axios.get("http://localhost:8080/api/admin/waste-statistics", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setWasteStatistics(responseStats.data);
                console.log('Top ', responseStats.data);

                // Fetch top-rated routes
                const responseRoutes = await axios.get("http://localhost:8080/api/admin/top-rated-routes", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setTopRatedRoutes(responseRoutes.data);
                console.log('Top Rated Routes:', responseRoutes.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStatistics();
    }, [token]);

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

                {/* Waste Statistics Table */}
                <WasteBarChart wasteStats={wasteStatistics}/>
                <table>
                    <thead>
                    <tr>
                        <th>Area</th>
                        <th>Total E-Waste</th>
                        <th>Total Food Waste</th>
                        <th>Total Recyclable Waste</th>
                        <th>Total Regular Waste</th>
                        <th>Total Weight(Kg)</th>
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
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Top Rated Routes Table */}
                <h2 style={{paddingTop: 20}}>Top Rated Routes</h2>

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
                            <td>{route.rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashBoard;