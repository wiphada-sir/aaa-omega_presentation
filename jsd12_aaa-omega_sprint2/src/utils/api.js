// --- URL สำหรับระบบเก่า (Admin จัดการสินค้า) ---
const BASE_URL = import.meta.env.VITE_API_URL;

// --- URL สำหรับระบบใหม่ (ตะกร้าสินค้า) ---
const API_CART_URL = import.meta.env.VITE_API_URL;

// เอาฟังก์ชัน getAuthToken ออกได้เลย เพราะเราให้ Browser จัดการ Cookie ให้อัตโนมัติแล้ว

// ==========================================
// --- Admin Products API (ของเดิมที่ต้องเก็บไว้) ---
// ==========================================

export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};

// ==========================================
// --- Cart API (เวอร์ชันใหม่ล่าสุด ใช้ Cookie แทน) ---
// ==========================================

export const getCart = async () => {
  const response = await fetch(`${API_CART_URL}/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include" // ✅ ดึงผ่าน Cookie
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
};

export const addToCartAPI = async (productNumber, quantity) => {
  const response = await fetch(`${API_CART_URL}/carts/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, // ❌ เอา Authorization ออก
    body: JSON.stringify({ productNumber, quantity }),
    credentials: "include" // ✅ เติมบรรทัดนี้ เพื่อแนบ Cookie ทุกครั้ง
  });
  if (!response.ok) throw new Error("Failed to add item to cart");
  return response.json();
};

export const updateCartItem = async (productNumber, quantity) => {
  const response = await fetch(`${API_CART_URL}/carts/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }, // ❌ เอา Authorization ออก
    body: JSON.stringify({ productNumber, quantity }),
    credentials: "include" // ✅ เติมบรรทัดนี้
  });
  if (!response.ok) throw new Error("Failed to update quantity");
  return response.json();
};

export const removeFromCart = async (productNumber) => {
  const response = await fetch(`${API_CART_URL}/carts/remove/${productNumber}`, {
    method: "DELETE",
    credentials: "include" // ✅ เติมบรรทัดนี้ (ไม่ต้องมี Header เพราะไม่ได้ส่ง Body)
  });
  if (!response.ok) throw new Error("Failed to remove item");
  return response.json();
};

// ==========================================
// --- Orders API (ปรับให้ใช้ Cookie ให้สอดคล้องกัน) ---
// ==========================================

export const fetchUserOrders = async (userNumber) => {
  const response = await fetch(`${API_CART_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include" // ✅ ใช้ Cookie แทน Authorization Header
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  const result = await response.json();
  const allOrders = result.data || [];
  return allOrders.filter(order => order.customer?.userNumber === userNumber);
};

export const getMyProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // แปลงผลลัพธ์เป็น JSON
    const resultData = await response.json(); 

    // เนื่องจากฝั่ง Checkout คุณเรียกใช้ `user.data` 
    // เราจึงต้องจำลองการห่อ Object ให้มี key ชื่อ data กลับไป
    return { data: resultData }; 

  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};