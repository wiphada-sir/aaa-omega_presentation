import { useState, useEffect } from "react";

import { AdminAuthContext } from "./authAdminContext";
import { loginUser, logoutUser, fetchMyProfile } from "../../api/admin/user";

export const AdminAuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const result = await loginUser({ email, password });
    if (!result) return null;
    const profile = await fetchMyProfile();
    if (!profile || (profile.role !== "admin" && profile.role !== "staff")) {
      await logoutUser();
      setUser(null);
      return null;
    };
    setUser(profile);
    return profile;
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const profile = await fetchMyProfile();
        if (profile && (profile.role === "admin" || profile.role === "staff")) {
          setUser(profile);
        } else {
          setUser(null);
        };
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      };
    };
    refreshUser();
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      user, loading,
      login, logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );

};