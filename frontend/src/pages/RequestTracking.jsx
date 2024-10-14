import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../assets/css/RequestTracking.css'; // Import the CSS file

// Custom red marker for the user location
const createIcon = (size) => new L.Icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-pins-v-2/512/map_pin_destination_location_adress_street-256.png',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const RequestTracking = () => {
    const [route, setRoute] = useState([]);
    const [employeeLocation, setEmployeeLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [distance, setDistance] = useState('Cannot be generated');
    const [timeTaken, setTimeTaken] = useState('Cannot be generated');
    const [arrivalTime, setArrivalTime] = useState('Cannot be generated');
    const [errorMessage, setErrorMessage] = useState('');
    const mapRef = useRef();
    const token = localStorage.getItem('token');
    const userAddress = localStorage.getItem('address');
    const openCageApiKey = import.meta.env.VITE_REACT_OPENCAGE_API_KEY;
    const SPEED_KMH = 50;

    const geocodeAddress = async (address) => {
        try {
            const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
                params: { q: address, key: openCageApiKey },
            });
            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                return [parseFloat(lat), parseFloat(lng)];
            } else {
                throw new Error('Invalid address');
            }
        } catch (error) {
            console.error('Geocoding error: ', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchEmployeeLocation = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/by-role', {
                    params: { role: 'EMPLOYEE' },
                    headers: { Authorization: `Bearer ${token}` },
                });
                const employeeAddress = response.data[0].address;
                const employeeCoords = await geocodeAddress(employeeAddress);
                const userCoords = await geocodeAddress(userAddress);

                if (!employeeCoords || !userCoords) {
                    throw new Error('Failed to generate route');
                }

                setEmployeeLocation(employeeCoords);
                setUserLocation(userCoords);
                setRoute([employeeCoords, userCoords]);

                if (mapRef.current) {
                    mapRef.current.setView(employeeCoords, 13);
                }

                const calculatedDistance = calculateDistance(employeeCoords, userCoords);
                setDistance(`${calculatedDistance.toFixed(2)} km`);

                const timeInHours = calculatedDistance / SPEED_KMH;
                setTimeTaken(`${(timeInHours * 60).toFixed(0)} mins`);

                const arrival = calculateArrivalTime(timeInHours);
                setArrivalTime(arrival);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching employee location: ', error);
                setErrorMessage('Error while tracking your request');
            }
        };

        fetchEmployeeLocation();
    }, [token, userAddress, openCageApiKey]);

    const calculateDistance = ([lat1, lon1], [lat2, lon2]) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const calculateArrivalTime = (hours) => {
        const now = new Date();
        now.setHours(now.getHours() + hours);
        return now.toLocaleTimeString();
    };

    return (
        <div className="request-tracking-container">
            <h2 className="request-tracking-header">Track Employee Location</h2>
            {errorMessage ? (
                <div className="error-message">{errorMessage}</div>
            ) : (
                <MapContainer
                    ref={mapRef}
                    center={employeeLocation || [51.505, -0.09]}
                    zoom={13}
                    className="map"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {employeeLocation && <Marker position={employeeLocation} />}
                    {userLocation && <Marker position={userLocation} icon={createIcon([35, 61])} />}
                    {route.length > 0 && <Polyline positions={route} color="blue" />}
                </MapContainer>
            )}
            <div className="info-container">
                <p><strong>Distance:</strong> {distance}</p>
                <p><strong>Time Taken:</strong> {timeTaken}</p>
                <p><strong>Estimated Arrival Time:</strong> {arrivalTime}</p>
            </div>
        </div>
    );
};

export default RequestTracking;
