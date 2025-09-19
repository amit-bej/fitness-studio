// src/components/Home.js
import React from 'react';
import { useState, useEffect } from 'react';
function Home() {
    const slides = [
        "/images/slide_0.jpg",
        "/images/slide_1.jpg",
        "/images/slide_2.jpg",
        "/images/slide_3.jpg",
        "/images/slide_4.jpg"
    ];

    const [current, setCurrent] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="min-h-screen flex flex-col">
            <section
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/HomeBanner.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome To Fitness Club</h1>
                    <p className="text-xl">Your fitness journey starts here</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-700 mb-2">2,260</div>
                            <p className="text-gray-600">Members</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-700 mb-2">210</div>
                            <p className="text-gray-600">Daily Visitors</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-700 mb-2">887</div>
                            <p className="text-gray-600">Health Program</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-700 mb-2">1,920</div>
                            <p className="text-gray-600">Heart Beat</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            {/* <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold mb-4">Step Up Your Fitness</h2>
                            <p className="mb-4 text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam
                                voluptatibus animi aspernatur ducimus quas obcaecati mollitia quibusdam temporibus culpa dolore
                                molestias blanditiis consequuntur sunt nisi.
                            </p>
                            <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
                                Get In Touch
                            </button>
                        </div>
                        <div className="md:w-1/2 md:pl-12">
                            <img
                                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                                alt="Fitness"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Classes Section */}
            {/* <section className="py-16 bg-white" id="classes-section">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">Classes</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam
                            voluptatibus animi aspernatur ducimus quas obcaecati mollitia quibusdam temporibus culpa dolore molestias
                            blanditiis consequuntur sunt nisi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                                <img
                                    src={`https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1`}
                                    alt="Class"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">Class Fitness Name Here</h3>
                                    <p className="text-blue-700 mb-4">Fitness</p>
                                    <button className="text-blue-700 hover:text-blue-900 font-medium">Learn More →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Schedule Section */}
            {/* <section className="py-16 bg-gray-100" id="schedule-section">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">Schedule</h2>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem possimus distinctio ex. Natus totam
                            voluptatibus animi aspernatur ducimus quas obcaecati mollitia quibusdam temporibus culpa dolore molestias
                            blanditiis consequuntur sunt nisi.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Gym</td>
                                        <td className="px-6 py-4 whitespace-nowrap">8:00am - 10:00am</td>
                                        <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-700 hover:text-blue-900">Join Now</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Meditation</td>
                                        <td className="px-6 py-4 whitespace-nowrap">10:00am - 10:30am</td>
                                        <td className="px-6 py-4 whitespace-nowrap">James Holmes</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-700 hover:text-blue-900">Join Now</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Weight Lifting</td>
                                        <td className="px-6 py-4 whitespace-nowrap">1:00pm - 2:30pm</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Ben Smith</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-700 hover:text-blue-900">Join Now</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="relative w-full h-[500px] overflow-hidden rounded-lg">
                {/* Slides */}
                {slides.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Prev Button */}
                <button
                    onClick={() =>
                        setCurrent(current === 0 ? slides.length - 1 : current - 1)
                    }
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
                >
                    ◀
                </button>

                {/* Next Button */}
                <button
                    onClick={() =>
                        setCurrent(current === slides.length - 1 ? 0 : current + 1)
                    }
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
                >
                    ▶
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-500" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="max-w-2xl text-center">
                            <h3 className="text-xl font-bold mb-4">About Fitness Club</h3>
                            <p className="text-gray-400">
                                Welcome to Fitness Club, your ultimate companion for discovering,
                                booking, and managing fitness classes with ease. Whether you're a
                                beginner or a seasoned athlete, our platform connects you with a
                                variety of classes, trainers, and fitness studios tailored to your goals.
                                We believe fitness should be accessible, convenient, and inspiring.
                                With just a few taps, you can reserve your spot, track your progress,
                                and stay motivated on your journey to a healthier, stronger you.
                                Join our community and make every workout count!
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;