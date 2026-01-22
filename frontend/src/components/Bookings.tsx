import React, { useEffect, useState } from 'react';
import { cancelBooking, getBooking } from '../services/userServices';

function Bookings() {
    const [bookings, setBookings] = useState<any>([]); // bookings structure seems to be { success: true, data: [...] } or just array? userServices getBooking returns {success: true, data: data}. Wait.
    // userServices.ts: return { success: true, data: data }; where data is RESPONSE json.
    // Response json of /bookings likely has { data: [...] } or IS [...]? 
    // In existing Bookings.js: bookings.data.map... so bookings likely object with data property.
    // I'll initialize with {} or handle null.

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchBookings();
    }, []);
    const fetchBookings = async () => {
        try {
            const data = await getBooking();
            console.log(data);
            setBookings(data); // data is { success: true, data: ... }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
            alert("Failed to load bookings. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    };
    const handleCancel = async (bookingId: any) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }
        try {
            const result: any = await cancelBooking(bookingId);

            if (result.success) {
                alert(result.message);
                // refresh list
                fetchBookings();
            } else {
                alert(result.error || "Action failed");
            }
        } catch (error) {
            alert("An error occurred while cancelling booking. Please try again.");
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg font-medium text-gray-700">Loading bookings...</div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {bookings.data && bookings.data.length > 0 ? (
                <div className="flex justify-center">
                    <table className="min-w-[70%] border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border font-semibold">
                                    Class Name
                                </th>
                                <th className="py-3 px-4 border font-semibold">
                                    Date & Time
                                </th>
                                <th className="py-3 px-4 border font-semibold">
                                    Instructor
                                </th>
                                <th className="py-3 px-4 border font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.data.map((element: any, index: number) => (
                                <tr key={element.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border font-medium">
                                        {element.class_name}
                                    </td>
                                    <td className="py-3 px-4 border">
                                        {element.date_time}
                                    </td>
                                    <td className="py-3 px-4 border">
                                        {element.instructor}
                                    </td>
                                    <td className="py-3 px-4 border text-center">
                                        <button className='px-4 py-2 center rounded-lg bg-red-700 text-white '
                                            onClick={() => handleCancel(element.id)}
                                        >Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No bookings found.</p>
            )}
        </div>
    );
}

export default Bookings;
