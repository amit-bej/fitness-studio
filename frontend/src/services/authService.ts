// src/services/authService.ts
// Take API base URL from environment variable (in .env file)
const API_URL = process.env.REACT_APP_API_URL;

/*
  LOGIN FUNCTION
*/
export const login = async (username: string, password: string) => {
    try {
        if (!username?.trim() || !password?.trim()) {
            return {
                success: false,
                message: "Username and password are required"
            };
        }

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username: username.trim(), password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `Login failed (${response.status})`,
                error: data.error
            };
        }

        return { success: true, ...data };
    } catch (error: any) {
        console.error("Login error:", error);
        return {
            success: false,
            message: error.name === 'TypeError'
                ? "Unable to connect to server. Please check your connection."
                : error.message
        };
    }
};


/*
  LOGOUT FUNCTION
*/
export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });

        // Handle case where server returns HTML error page
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || `Logout failed (${response.status})`
                };
            }

            return { success: true, message: data.message };
        } else {
            // If not JSON response, still consider logout successful for client cleanup
            return {
                success: true,
                message: "Logged out successfully"
            };
        }
    } catch (error) {
        console.error("Logout error:", error);
        return {
            success: false,
            message: "Logout failed. Please try again."
        };
    }
};

export async function register(payload: any) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // tell backend it's JSON
            credentials: "include", // include cookies (for Flask-Login session)
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Logout failed");
        }
        return { success: true, message: data.message };
    } catch (error: any) {
        return { success: false, message: error.message };
    }

}
