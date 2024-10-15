// RatingPage.js
import { useEffect, useState } from "react";
import "../../assets/CSS/AdminB.css";
import axios from "axios";

function RatingPage() {
    const [topRatedRoutes, setTopRatedRoutes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTopRatedRoutes = async () => {
            if (!token) {
                setError("No token found, please log in");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
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
        fetchTopRatedRoutes();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-dashboard-container">

            <div className="dashboard">
                <h2>Top Rated Routes</h2>
                <div className="rating-box">
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
        </div>
    );
}

export default RatingPage;