import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
    const { requestId } = useParams();
    const [route, setRoute] = useState([]); // State to store the route coordinates
    const [wastePlace, setWastePlace] = useState([51.505, -0.09]); // Dummy coordinates for waste place
    const [employeeLocation] = useState([51.505, -0.09]); // Employee's current location (could be dynamic)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                // Simulating fetching route data based on request ID
                const response = await axios.get(`/api/requests/${requestId}`);
                const { wasteCollectionPlace } = response.data;

                // Use actual coordinates from backend response if available
                const destinationCoordinates = wasteCollectionPlace ? wasteCollectionPlace.split(',').map(Number) : [51.515, -0.09];

                setWastePlace(destinationCoordinates); // Set destination (waste collection place)

                // Set route from employee's current location to destination coordinates
                setRoute([employeeLocation, destinationCoordinates]);
            } catch (error) {
                console.error("Error fetching route data: ", error);
            }
        };

        fetchRoute();
    }, [requestId, employeeLocation]);

    const handleCompleted = () => {
        // Convert the route array to a JSON string
        const routeString = JSON.stringify(route);

        // Pass the route string in the URL parameters
        navigate(`/form-submission/${requestId}?route=${encodeURIComponent(routeString)}`);
    };


    return (
        <div>
            <h2>Route to Waste Collection Place</h2>
            <MapContainer center={employeeLocation} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={employeeLocation} /> {/* Employee's current location */}
                <Marker position={wastePlace} /> {/* Waste Collection Place */}
                <Polyline positions={route} color="blue" /> {/* Route from current location to destination */}
            </MapContainer>
            <button onClick={handleCompleted} style={{ marginTop: '20px' }}>Completed</button>
        </div>
    );
};

export default MapPage;
