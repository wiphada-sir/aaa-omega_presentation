import { useState, useEffect, useRef } from "react";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import { MessageContext } from "./MessageContext";
import { fetchUsers, registerUser, updateUser, deleteUser } from "../../api/admin/user";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../api/admin/product";
import { fetchOrders, updateOrderStatus, updateOrderInternalNote, deleteOrder } from "../../api/admin/order";
import { fetchServices, updateService, updateServiceStatus, deleteService } from "../../api/admin/service";

export const MessageProvider = ({children}) => {

  const isDev = import.meta.env.VITE_IS_DEV === "true" || false;
  const itemPerPage = Number(import.meta.env.VITE_ITEM_PER_PAGE) || 10;

  const { isAuthenticated } = useAdminAuth();

  // Dashboard - Nav Main
  const [adminNavMainActive, setAdminNavMainActive] = useState(false);
  const handleAdminNavMainToggle = () => setAdminNavMainActive(!adminNavMainActive);
  const handleAdminNavSidebarClose = () => setTimeout(() => setAdminNavMainActive(false), 300);

  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimer = useRef(null);
  const showToast = (message) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    };
    setToast({ show: true, message });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "" });
      toastTimer.current = null;
    }, 1500);
  };
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      };
    };
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return;
    const getUsers = async () => setUsers(await fetchUsers() || []);
    getUsers();
  }, [isAuthenticated]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return;
    const getProducts = async () => setProducts(await fetchProducts() || []);
    getProducts();
  }, [isAuthenticated]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return;
    const getOrders = async () => setOrders(await fetchOrders() || []);
    getOrders();
  }, [isAuthenticated]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return;
    const getServices = async () => setServices(await fetchServices() || []);
    getServices();
  }, [isAuthenticated]);

  const handleOrderStatusChange = async (id, status) => {
    try {
      showToast("กำลังบันทึกสถานะคำสั่งซื้อ...");
      const updated = await updateOrderStatus(id, { status });
      if (updated) {
        setOrders((prev) => prev.map((item) => item._id === id ? { ...item, status: updated.status } : item ));
        showToast("บันทึกสถานะคำสั่งซื้อสำเร็จ");
      } else {
        showToast("บันทึกสถานะคำสั่งซื้อไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleServiceStatusChange = async (id, status) => {
    try {
      showToast("กำลังบันทึกสถานะบริการ...");
      const updated = await updateServiceStatus(id, { status });
      if (updated) {
        setServices((prev) => prev.map((item) => item._id === id ? { ...item, status: updated.status } : item ));
        showToast("บันทึกสถานะบริการสำเร็จ");
      } else {
        showToast("บันทึกสถานะบริการไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };

  const handleUserSave = async (id, data) => {
    try {
      showToast("กำลังบันทึกข้อมูลบัญชี...");
      const cleanData = { ...data };
      delete cleanData.password;
      delete cleanData.password2;
      const result = id ? await updateUser(id, cleanData) : await registerUser(data);
      if (result) {
        if (id) {
          setUsers(prev => prev?.map(item => item?._id === id ? { ...item, ...result } : item ));
        } else {
          setUsers(prev => [result, ...(prev || [])]);
        };
        showToast("บันทึกข้อมูลบัญชีสำเร็จ");
      } else {
        showToast("บันทึกข้อมูลบัญชีไม่สำเร็จ");
      };
      return result;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleProductSave = async (id, data) => {
    try {
      showToast("กำลังบันทึกข้อมูลสินค้า...");
      const result = id ? await updateProduct(id, data) : await createProduct(data);
      if (result) {
        if (id) {
          setProducts(prev => prev?.map(item => item?._id === id ? { ...item, ...result } : item ));
        } else {
          setProducts(prev => [result, ...(prev || [])]);
        };
        showToast("บันทึกข้อมูลสินค้าสำเร็จ");
      } else {
        showToast("บันทึกข้อมูลสินค้าไม่สำเร็จ");
      };
      return result;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleOrderSave = async (id, internalNote) => {
    try {
      showToast("กำลังบันทึกโน้ตคำสั่งซื้อ...");
      const updated = await updateOrderInternalNote(id, { internalNote });
      if (updated) {
        setOrders((prev) => prev?.map(item => item?._id === id ? { ...item, internalNote: updated.internalNote } : item ));
        showToast("บันทึกโน้ตคำสั่งซื้อสำเร็จ");
      } else {
        showToast("บันทึกโน้ตคำสั่งซื้อไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleServiceSave = async (id, data) => {
    try {
      showToast("กำลังบันทึกข้อมูลบริการ...");
      const updated = await updateService(id, data);
      if (updated) {
        setServices((prev) => prev?.map(item => item?._id === id ? { ...item, ...updated } : item ));
        showToast("บันทึกข้อมูลบริการสำเร็จ");
      } else {
        showToast("บันทึกข้อมูลบริการไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };

  const handleUserDelete = async (id) => {
    try {
      showToast("กำลังลบบัญชี...");
      const deleted = await deleteUser(id);
      if (deleted) {
        setUsers((prev) => prev.filter((item) => item?._id !== id));
        showToast("ลบบัญชีสำเร็จ");
      } else {
        showToast("ลบบัญชีไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleProductDelete = async (id) => {
    try {
      showToast("กำลังลบสินค้า...");
      const deleted = await deleteProduct(id);
      if (deleted) {
        setProducts((prev) => prev.filter((item) => item?._id !== id));
        showToast("ลบสินค้าสำเร็จ");
      } else {
        showToast("ลบสินค้าไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleOrderDelete = async (id) => {
    try {
      showToast("กำลังลบคำสั่งซื้อ...");
      const deleted = await deleteOrder(id);
      if (deleted) {
        setOrders((prev) => prev.filter((item) => item?._id !== id));
        showToast("ลบคำสั่งซื้อสำเร็จ");
      } else {
        showToast("ลบคำสั่งซื้อไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleServiceDelete = async (id) => {
    try {
      showToast("กำลังลบบริการ...");
      const deleted = await deleteService(id);
      if (deleted) {
        setServices((prev) => prev.filter((item) => item?._id !== id));
        showToast("ลบบริการสำเร็จ");
      } else {
        showToast("ลบบริการไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };

  return(
    <MessageContext.Provider value={{
      isDev, itemPerPage,
      adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose,
      toast, showToast, 
      users, setUsers, handleUserSave, handleUserDelete,
      products, setProducts, handleProductSave, handleProductDelete,
      orders, setOrders, handleOrderStatusChange, handleOrderSave, handleOrderDelete,
      services, setServices, handleServiceStatusChange, handleServiceSave, handleServiceDelete,
    }}>
      {children}
    </MessageContext.Provider>
  );

};