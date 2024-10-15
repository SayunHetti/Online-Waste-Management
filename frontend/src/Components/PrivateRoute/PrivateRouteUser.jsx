import  { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const [alertShown, setAlertShown] = useState(false);
    const currentCustomer = localStorage.getItem("user_id");

    useEffect(() => {
        if (!currentCustomer && !alertShown) {
            alert("You must log in first to access this page.");
            setAlertShown(true); // Set alert shown to true to prevent duplicate alerts
        }
    }, [currentCustomer, alertShown]);

    return currentCustomer ? <Outlet /> : <Navigate to="/" />;
}