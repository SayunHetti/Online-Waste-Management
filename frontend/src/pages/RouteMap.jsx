import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom red marker for the destination
const redIcon = new L.Icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=glyphish_target|ff0000',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapPage = () => {
    const { requestId } = useParams();
    const [route, setRoute] = useState([]);
    const [wastePlace, setWastePlace] = useState(null);
    const [employeeLocation, setEmployeeLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputEmployeeCoords, setInputEmployeeCoords] = useState('');
    const [inputWasteCoords, setInputWasteCoords] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const employeeAddress = localStorage.getItem('address');
    const mapRef = useRef(); // Create a ref for the map container
    const openCageApiKey = import.meta.env.VITE_REACT_OPENCAGE_API_KEY;
    console.log('OpenCage API Key:', openCageApiKey);

    useEffect(() => {
        const geocodeAddress = async (address) => {
            try {
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                    params: {
                        q: address,
                        key: openCageApiKey,
                    },
                });

                if (response.data.results.length > 0) {
                    const { lat, lng } = response.data.results[0].geometry;
                    console.log(`Geocoded coordinates for ${address}: `, lat, lng); // Log geocoded coordinates
                    return [parseFloat(lat), parseFloat(lng)];
                } else {
                    throw new Error("Invalid address");
                }
            } catch (error) {
                console.error("Geocoding error: ", error);
                return null;
            }
        };

        const fetchRoute = async () => {
            try {
                const employeeCoords = await geocodeAddress(employeeAddress);
                if (!employeeCoords) throw new Error("Employee location not found");

                const response = await axios.get(
                    `http://localhost:8080/api/requests/${requestId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                const wastePlaceAddress = response.data.address;
                const wasteCoords = await geocodeAddress(wastePlaceAddress);
                if (!wasteCoords) throw new Error("Waste collection place location not found");

                setEmployeeLocation(employeeCoords);
                setWastePlace(wasteCoords);
                setRoute([employeeCoords, wasteCoords]);
                setErrorMessage('');

                // Set the view to the employee location
                if (mapRef.current) {
                    mapRef.current.setView(employeeCoords, 13); // Adjust zoom level as needed
                }
            } catch (error) {
                console.error("Error fetching route data: ", error);
                setErrorMessage('Route cannot be generated');
            }
        };

        fetchRoute();
    }, [requestId, employeeAddress, token, openCageApiKey]);

    const handleCompleted = () => {
        let finalRoute;
        if (errorMessage && inputEmployeeCoords && inputWasteCoords) {
            const employeeCoordsArray = inputEmployeeCoords.split(',').map(Number);
            const wasteCoordsArray = inputWasteCoords.split(',').map(Number);
            finalRoute = [employeeCoordsArray, wasteCoordsArray];
            console.log('Using user-inputted coordinates: ', finalRoute); // Log user input coordinates
        } else {
            finalRoute = route;
            console.log('Using auto-generated route: ', finalRoute); // Log auto-generated route
        }

        const routeString = JSON.stringify(finalRoute);
        navigate(`/form-submission/${requestId}?route=${encodeURIComponent(routeString)}`);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: 'auto' }}>
            <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Route to Waste Collection Place</h2>
            {errorMessage ? (
                <div style={{ textAlign: 'center', color: 'red', marginBottom: '20px' }}>
                    {errorMessage}
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Please input coordinates manually</h3>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>Employee Location (Lat, Lng): </label>
                            <input
                                type="text"
                                value={inputEmployeeCoords}
                                onChange={(e) => setInputEmployeeCoords(e.target.value)}
                                placeholder="e.g. 51.505, -0.09"
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
                            />
                        </div>
                        <div>
                            <label style={{ marginRight: '10px' }}>Waste Collection Place (Lat, Lng): </label>
                            <input
                                type="text"
                                value={inputWasteCoords}
                                onChange={(e) => setInputWasteCoords(e.target.value)}
                                placeholder="e.g. 51.515, -0.09"
                                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <MapContainer ref={mapRef} center={employeeLocation || [51.505, -0.09]} zoom={13}
                              style={{ height: "400px", width: "100%", borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {employeeLocation && <Marker position={employeeLocation} />}
                    {wastePlace && <Marker position={wastePlace} icon={redIcon} />}
                    {route.length > 0 && <Polyline positions={route} color="blue" />}
                </MapContainer>
            )}
            <button
                onClick={handleCompleted}
                style={{
                    backgroundColor: 'white',
                    marginTop: 20,
                    color: 'black',
                    border: '2px solid green',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    borderRadius: '5px',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'green'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
                Completed
            </button>
        </div>
    );
};

export default MapPage;
