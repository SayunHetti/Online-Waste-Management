import  { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
    const [alertShown, setAlertShown] = useState(false);
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "ADMIN" && !alertShown) {
            alert(
                "You don't have permission to view this page."
            );
            setAlertShown(true); // Set alert shown to true to prevent duplicate alerts
        }
    }, [role, alertShown]);

    return role === "ADMIN" ? <Outlet /> : <Navigate to="/profile" />;
}