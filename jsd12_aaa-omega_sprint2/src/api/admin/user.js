const apiBase = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  const result = await res.json();
  if (!res.ok) {
    throw new Error( result.message || result.error || `HTTP error: ${res.status}` );
  };
  return result.data;
};

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${apiBase}/users/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${apiBase}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${apiBase}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const forgotPassword = async () => {
  // forgot Password
};

export const fetchMyProfile = async () => {
  try {
    const res = await fetch(`${apiBase}/users/profile`, {
      credentials: "include",
    });
    if (res.status === 401) {
      return null;
    };
    return await handleResponse(res);
  } catch {
    return null;
  };
};

export const updateMyProfile = async (data) => {
  try {
    const res = await fetch(`${apiBase}/users/profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const updateMyPassword = async (data) => {
  try {
    const res = await fetch(`${apiBase}/users/profile/password`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${apiBase}/users`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchUserByNumber = async (userNumber) => {
  try {
    const res = await fetch(`${apiBase}/users/number/${userNumber}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchUserById = async (id) => {
  try {
    const res = await fetch(`${apiBase}/users/${id}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const updateUser = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/users/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${apiBase}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const updateUserRole = async (id, role) => {
  try {
    const res = await fetch(`${apiBase}/users/${id}/role`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};