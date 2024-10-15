import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/CSS/MapPage.css'; // Importing the stylesheet

const createIcon = (size) => new L.Icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-pins-v-2/512/map_pin_destination_location_adress_street-256.png',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
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
    const mapRef = useRef();
    const openCageApiKey = import.meta.env.VITE_REACT_OPENCAGE_API_KEY;
    const [zoomLevel, setZoomLevel] = useState(13);

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

                if (mapRef.current) {
                    mapRef.current.setView(employeeCoords, zoomLevel);
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
        } else {
            finalRoute = route;
        }

        const routeString = JSON.stringify(finalRoute);
        navigate(`/form-submission/${requestId}?route=${encodeURIComponent(routeString)}`);
    };

    return (
        <div className="map-page-container">
            <h2 className="map-page-title">Route to Waste Collection Place</h2>
            {errorMessage ? (
                <div className="map-page-error">
                    {errorMessage}
                    <div className="map-page-input-container">
                        <h3 className="map-page-input-title">Please input coordinates manually</h3>

                        <div className="map-page-input-group">
                            <label className="map-page-input-label">Employee Location (Lat, Lng): </label>
                            <input
                                className="map-page-input"
                                type="text"
                                value={inputEmployeeCoords}
                                onChange={(e) => setInputEmployeeCoords(e.target.value)}
                                placeholder="e.g. 51.505, -0.09"
                            />
                        </div>

                        <div className="map-page-input-group">
                            <label className="map-page-input-label">Waste Collection Place (Lat, Lng): </label>
                            <input
                                className="map-page-input"
                                type="text"
                                value={inputWasteCoords}
                                onChange={(e) => setInputWasteCoords(e.target.value)}
                                placeholder="e.g. 51.515, -0.09"
                            />
                        </div>
                    </div>

                </div>
            ) : (
                <MapContainer
                    ref={mapRef}
                    center={employeeLocation || [51.505, -0.09]}
                    zoom={zoomLevel}
                    className="map-page-map-container"
                    onzoomend={() => setZoomLevel(mapRef.current.getZoom())}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {employeeLocation && <Marker position={employeeLocation}/>}
                    {wastePlace && <Marker position={wastePlace} icon={createIcon([35, 61])}/>}
                    {route.length > 0 && <Polyline positions={route} color="blue"/>}
                </MapContainer>
            )}
            <button
                className="map-page-button"
                onClick={handleCompleted}
            >
                Completed
            </button>
        </div>
    );
};

export default MapPage;
