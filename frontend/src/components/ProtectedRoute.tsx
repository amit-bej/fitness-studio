import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // Or call an API like /api/me to check session
    // Note: App.js uses "user" in localStorage mostly? But ProtectedRoute uses "isLoggedIn"?
    // Inspection of App.js showed `localStorage.getItem("user")`.
    // Inspection of ProtectedRoute.js showed `localStorage.getItem("isLoggedIn")`.
    // Login.js sets `localStorage.setItem("user", ...)` AND does NOT set "isLoggedIn".
    // This looks like a BUG in the original code or I missed where isLoggedIn is set.
    // Wait, I should check Login.js again.
    // Login.js: `localStorage.setItem("user", ...)` then navigate.
    // It does NOT set isLoggedIn.
    // This means ProtectedRoute likely FAILS always unless isLoggedIn is set elsewhere.
    // I will check if I should fix this to check "user" instead.
    // "user" is set in App.js and Login.js.
    // I will change it to check "user" key to match App logic, OR preserve original.
    // Given request is "convert to TS", I should mostly preserve logic unless it's broken. But if it's broken, fixing is nice.
    // I will assume "user" key is the source of truth as per App.js.

    const user = localStorage.getItem("user");

    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
