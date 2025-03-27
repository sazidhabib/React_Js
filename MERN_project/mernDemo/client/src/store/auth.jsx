import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(() => {
        try {
            const storedIsAdmin = localStorage.getItem("isAdmin");
            return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
        } catch (error) {
            console.error("Error parsing isAdmin from localStorage:", error);
            return false;
        }
    });

    // Store token and admin status in localStorage
    const storeTokenInLS = (serverToken, adminStatus) => {
        localStorage.setItem("token", serverToken);
        localStorage.setItem("isAdmin", JSON.stringify(!!adminStatus)); // Store true/false properly
        setToken(serverToken);
        setIsAdmin(!!adminStatus);
    };

    const isLoggedIn = !!token;

    // Logout function
    const LogoutUser = () => {
        setToken("");
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, isAdmin, storeTokenInLS, LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used inside the AuthProvider");
    }
    return authContextValue;
};
