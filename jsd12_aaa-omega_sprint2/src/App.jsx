import { createBrowserRouter, RouterProvider } from "react-router-dom";

// นำเข้า Header
import Header from "./components/HeaderSection";
import HeaderSectionAuth from "./components/HeaderSectionAuth";

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./pages/admin/Home";
import AdminProducts from "./pages/admin/Products";
import AdminProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderItem from "./pages/admin/OrderItem";
import AdminServices from "./pages/admin/Services";
import AdminServiceForm from "./pages/admin/ServiceForm";
import AdminUsers from "./pages/admin/Users";
import AdminUserDetail from "./pages/admin/UserDetail";
import AdminUserForm from "./pages/admin/UserForm";
import AdminUserOrderDetail from "./pages/admin/UserOrderDetail";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/Login";
// import AuthRegister from "./pages/auth/Register";
// import AuthForgotPassword from "./pages/auth/ForgotPassword";

import './assets/css/App.css';

// นำเข้าหน้าฝั่ง User
import HomePage from './pages/HomePage';
import TestimonialsPage from './pages/TestimonialsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FooterSection from './components/FooterSection';
import CartPage from './pages/CartPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "allproducts",        // สินค้า
        element: (
          <>
            <Header />
            <HeaderSectionAuth />
            <AllProductsPage />
            <FooterSection />
          </>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <>
            <Header />
            <HeaderSectionAuth />
            <ProductDetailPage />
            <FooterSection />
          </>
        ),
      },
      {
        path: "services",        // บริการ
        element: <ServicesPage />,
      },
      {
        path: "portfolio",       // ผลงาน 
        element: <div>Portfolio Page (Coming Soon)</div>,
      },
      {
        path: "contact",         // ติดต่อเรา
        element: <ContactPage />,
      },
      {
        path: "testimonials",
        // ใส่ Header เฉพาะหน้า TestimonialsPage
        element: (
          <>
            <Header />
            <HeaderSectionAuth />
            <TestimonialsPage />
          </>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <UserProfilePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: (
          <>
            <Header />
            <HeaderSectionAuth />
            <CheckoutPage />
            <FooterSection />
          </>
        ),
      },
      // ==========================================
      // เพิ่มหน้า Payment ตรงนี้ครับ!
      // ==========================================
      {
        path: "payment",
        element: <PaymentPage />,
      },
      { path:"admin",
        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          { index:true, element:<AdminHome /> },
          { path:"products", element:<AdminProducts /> },
          { path:"products/create", element:<AdminProductForm /> },
          { path:"products/:productNumber", element:<AdminProductForm /> },
          { path:"orders", element:<AdminOrders />, },
          { path:"orders/:orderNumber", element:<AdminOrderItem /> },
          { path:"services", element:<AdminServices />, },
          { path:"services/create", element:<AdminServiceForm /> },
          { path:"services/:serviceNumber", element:<AdminServiceForm />, },
          { path:"users", element:<AdminUsers /> },
          { path:"users/create", element:<AdminUserForm /> },
          { path:"users/:userNumber", element:<AdminUserDetail /> },
          { path:"users/:userNumber/edit", element:<AdminUserForm /> },
          { path:"users/:userNumber/:orderNumber", element:<AdminUserOrderDetail /> },
        ],
      },
      { path:"auth", element:<AuthLayout />,
        children: [
          { path:"login", element:<AuthLogin />, },
          // { path:"register", element:<AuthRegister />, },
          // { path:"forgot-password", element:<AuthForgotPassword />, },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}