// src/components/Classes.tsx
import React, { useEffect, useState } from "react";
import { getClasses, book } from "../services/userServices";
import { useNavigate } from "react-router-dom";

interface ClassesTableProps {
    username?: string;
}

const ClassesTable: React.FC<ClassesTableProps> = ({ username }) => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await getClasses();
                setClasses(data);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
                alert("Failed to load classes. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const handleBook = async (classId: any) => {
        if (bookingLoading[classId]) return;

        setBookingLoading(prev => ({ ...prev, [classId]: true }));

        try {
            const result = await book(classId);
            if (result.success) {
                alert(result.message);
                setClasses(prev =>
                    prev.map(cls =>
                        cls.id === classId ? { ...cls, available_slots: Math.max(0, cls.available_slots - 1) } : cls
                    )
                );
            } else {
                if (result.error === "Authentication required") {
                    navigate('/login');
                }
                console.log(result.error);
                alert(result.error || "Booking failed");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred while booking. Please try again.");
        } finally {
            setBookingLoading(prev => ({ ...prev, [classId]: false }));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading classes...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-center text-2xl font-bold mb-6">Fitness Classes</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border font-semibold">ID</th>
                            <th className="py-3 px-4 border font-semibold">Name</th>
                            <th className="py-3 px-4 border font-semibold">Date & Time</th>
                            <th className="py-3 px-4 border font-semibold">Instructor</th>
                            <th className="py-3 px-4 border font-semibold">Available Slots</th>
                            <th className="py-3 px-4 border font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((cls) => (
                            <tr key={cls.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border">{cls.id}</td>
                                <td className="py-3 px-4 border font-medium">{cls.name}</td>
                                <td className="py-3 px-4 border">{cls.datetime}</td>
                                <td className="py-3 px-4 border">{cls.instructor}</td>
                                <td className="py-3 px-4 border text-center">
                                    <span className={`font-semibold ${cls.available_slots > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {cls.available_slots}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border text-center">
                                    <button
                                        onClick={() => handleBook(cls.id)}
                                        disabled={cls.available_slots <= 0 || bookingLoading[cls.id]}
                                        className={`px-4 py-2 rounded-lg font-medium transition-colors
                      ${cls.available_slots <= 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : bookingLoading[cls.id]
                                                    ? 'bg-blue-400 text-white cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {bookingLoading[cls.id]
                                            ? "Booking..."
                                            : cls.available_slots <= 0
                                                ? "Full"
                                                : "Book"
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {classes.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500 italic">
                                    No classes available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassesTable;
