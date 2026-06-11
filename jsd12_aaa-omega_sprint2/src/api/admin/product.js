const apiBase = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  const result = await res.json();
  if (!res.ok) {
    throw new Error( result.message || result.error || `HTTP error: ${res.status}` );
  };
  return result.data;
};

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${apiBase}/products`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchProductByNumber = async (productNumber) => {
  try {
    const res = await fetch(`${apiBase}/products/number/${productNumber}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${apiBase}/products/${id}`, {
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};

export const createProduct = async (data) => {
  try {
    const res = await fetch(`${apiBase}/products`, {
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

export const updateProduct = async (id, data) => {
  try {
    const res = await fetch(`${apiBase}/products/${id}`, {
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

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${apiBase}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error(error.message);
    return null;
  };
};