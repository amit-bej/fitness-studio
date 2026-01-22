import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../services/authService";

function Register() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //check if passwords match before API call
        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
            return;
        }
        else {
            setMessage("");
        }
        const payload = {
            email: email,
            username: username,
            password: password
        }
        try {
            const data: any = await register(payload);
            if (data.success) {
                console.log("Registration Successfull");
                navigate("/login");
            }
            else {
                setMessage(data.message)
            }
        } catch (err: any) {
            setMessage(err.message);
        }

    }
    return (
        <section className="bg-gray-50 dark:bg-blue-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-00 md:text-2xl dark:text-white">
                            Create a account
                        </h1>
                        {message && <p className="mt-3 text-red-600">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="username" // input type username is not standard, but assuming design wants text
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="jhondao"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmpassword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    placeholder="••••••••"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`bg-gray-50 border text-gray-900 rounded-lg 
                              focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                              ${confirmpassword && confirmpassword !== password ? "border-red-500" : "border-gray-300"}`}
                                    required
                                />
                                {confirmpassword && confirmpassword !== password && (
                                    <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 
                        focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 
                        dark:border-gray-600 dark:focus:ring-blue-600 
                        dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the terms and conditon
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account yet?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
