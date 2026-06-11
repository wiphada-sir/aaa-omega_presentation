import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage and verify token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          credentials: "include"
        });
        
        if (response.ok) {
          const result = await response.json();
          const userData = result.data || result.user;
          setUser(userData);
          localStorage.setItem("authUser", JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(error.message);
        //if (!response.ok) throw new Error(text || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        result = {};
      }
      
      if (!response.ok) {
        throw new Error(result.message || result.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }

      const { token, data: userData } = result;

      setUser(userData || result.user); 
      localStorage.setItem("authUser", JSON.stringify(userData || result.user));
      if (token) localStorage.setItem("authToken", token);
      
      return true;
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    setError(null);
    try {
      const nameParts = (userData.fullName || "").trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      const payload = { ...userData, firstName, lastName };
      delete payload.fullName;

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(error.message);
        //if (!response.ok) throw new Error(text || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        result = {};
      }
      
      if (!response.ok) {
        throw new Error(result.message || result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      }

      const { token, data: newUserData } = result;

      setUser(newUserData || result.user);
      localStorage.setItem("authUser", JSON.stringify(newUserData || result.user));
      if (token) localStorage.setItem("authToken", token);
      
      return true;
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการลงทะเบียน");
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout failed:", e);
    }
    
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setError(null);
  };

  // Update profile function
  const updateProfile = async (updatedData) => {
    if (!user) {
      setError("ไม่มีผู้ใช้ที่ login");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(error.message);
        //if (!response.ok) throw new Error(text || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        result = {};
      }
      
      if (!response.ok) {
        throw new Error(result.message || result.error || "อัปเดตข้อมูลไม่สำเร็จ");
      }

      const updatedUser = result.data || result.user;
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
      return true;
    } catch (err) {
      setError(err.message || "อัปเดตข้อมูลไม่สำเร็จ");
      return false;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

//note