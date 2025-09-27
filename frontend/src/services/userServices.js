const API_URL = process.env.REACT_APP_API_URL;

export const getClasses = async () => {
    try {
        const response = await fetch(`${API_URL}/classes`, {
            method: 'GET',
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Faild to get Classes");
        }

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const book = async (classId) => {
    try {
        const response = await fetch(`${API_URL}/book`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                classid: classId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || "Failed to book class");
        }

        return { success: true, message: data.message };
    } catch (error) {
        console.error("Booking error:", error);
        return { success: false, error: error.message };
    }
};


export const getBooking = async () => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || data.message || "Failed to get bookings");
        }
        return { success: true, data: data };
    } catch (error) {
        console.error("Booking error:", error);
        return { success: false, error: error.message };
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        const response = await fetch(`${API_URL}/cancelBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                bookingId: bookingId
            })
        });

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return { 
                success: false, 
                error: `Unexpected response format. Status: ${response.status}` 
            };
        }

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { 
                success: false, 
                error: data.error || data.message || "Failed to cancel booking",
                status: response.status
            };
        }

        return { 
            success: true, 
            message: data.message,
            data: data.data // Include any additional data
        };
    } catch (error) {
        console.error("Cancel Booking error:", error);
        return { 
            success: false, 
            error: error.message,
            isNetworkError: error instanceof TypeError // Distinguish network errors
        };
    }
};
