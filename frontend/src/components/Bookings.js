import React, { useEffect, useState } from 'react';
import { cancelBooking, getBooking } from '../services/userServices';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
      try {
        const data = await getBooking();
        console.log(data);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        alert("Failed to load bookings. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
 const handleCancel = async (bookingId) => {
   if (!window.confirm("Are you sure you want to cancel this booking?")) {
    return;
  }
  try {
    const result = await cancelBooking(bookingId);

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
              {bookings.data.map((element, index) => (
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
