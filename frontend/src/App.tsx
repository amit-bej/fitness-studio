// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Classes from './components/Classes';
import Book from './components/Book';
import Bookings from './components/Bookings';
import Register from './components/Register';
import Login from './components/Login';
import { logout } from './services/authService';

function App() {
    console.log("App component is rendering");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Load user from localStorage on app start
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing stored user:", error);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to update user state (pass to Login component)
    const handleLogin = (userData: any) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const handleLogout = async () => {
        try {
            const result: any = await logout();
            if (result.success) {
                setUser(null);
                localStorage.removeItem("user");
                window.location.href = "/";
            } else {
                alert(result.message || "Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred during logout");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <Router>
            {/* Navbar */}
            <header className="bg-white shadow">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="text-2xl font-bold text-blue-700">
                        <Link to="/" className="flex items-center">
                            <img
                                className="w-12 h-12 mr-2"
                                src="/images/logo.png"
                                alt="logo"
                            />
                            <span>Fitness Club</span>
                        </Link>
                    </div>

                    <nav className="flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-700">Home</Link>
                        <Link to="/classes" className="text-gray-700 hover:text-blue-700">Classes</Link>

                        {user && (
                            <Link to="/bookings" className="text-gray-700 hover:text-blue-700">
                                Bookings
                            </Link>
                        )}

                        {user && (
                            <span className="text-gray-700">Welcome, {user.username}!</span>
                        )}

                        {!user ? (
                            <Link
                                to="/login"
                                className="ml-4 px-4 py-2 border border-blue-700 rounded text-blue-700 hover:bg-blue-700 hover:text-white transition"
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 border border-red-600 rounded text-red-600 hover:bg-red-600 hover:text-white transition"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            {/* Page Content */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/register" element={<Register />} />
                    {/* Pass handleLogin function to Login component */}
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
