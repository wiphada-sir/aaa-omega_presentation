const apiBase = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  const result = await res.json();
  if (!res.ok) {
    throw new Error( result.message || result.error || `HTTP error: ${res.status}` );
  };
  return result.data;
};

export const fetchOrders = async () => {
  try {
    const res = await fetch(`${apiBase}/orders`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchOrderByNumber = async (orderNumber) => {
  try {
    const res = await fetch(`${apiBase}/orders/number/${orderNumber}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchOrderById = async (id) => {
  try {
    const res = await fetch(`${apiBase}/orders/${id}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const createOrder = async (data) => {
  try {
    const res = await fetch(`${apiBase}/orders`, {
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

export const updateOrder = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/orders/${id}`, {
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

export const updateOrderStatus = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/orders/${id}/status`, {
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

export const updateOrderInternalNote = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/orders/${id}/internal-note`, {
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

export const deleteOrder = async (id) => {
  try {
    const res = await fetch(`${apiBase}/orders/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};