const API_URL = process.env.REACT_APP_API_URL;

export const getClasses = async () =>{
    try{
        const response = await fetch(`${API_URL}/classes`,{
            method:'GET',
            credentials:"include",
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Faild to get Classes");
        }

        return data;
    }catch(error){
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