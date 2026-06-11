const apiBase = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  const result = await res.json();
  if (!res.ok) {
    throw new Error( result.message || result.error || `HTTP error: ${res.status}` );
  };
  return result.data;
};

export const fetchServices = async () => {
  try {
    const res = await fetch(`${apiBase}/services`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchServiceByNumber = async (serviceNumber) => {
  try {
    const res = await fetch(`${apiBase}/services/number/${serviceNumber}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchServiceById = async (id) => {
  try {
    const res = await fetch(`${apiBase}/services/${id}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const createService = async (data) => {
  try {
    const res = await fetch(`${apiBase}/services`, {
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

export const updateService = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/services/${id}`, {
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

export const updateServiceStatus = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/services/${id}/status`, {
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

/*
export const updateServiceInternalNote = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/services/${id}/internal-note`, {
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
*/

export const deleteService = async (id) => {
  try {
    const res = await fetch(`${apiBase}/services/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};