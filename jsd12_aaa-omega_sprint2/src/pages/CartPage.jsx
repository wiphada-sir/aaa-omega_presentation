import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext/AuthContext';
import { useCart } from '../contexts/CartContext'; 
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import Header from '../components/HeaderSection';
import HeaderSectionAuth from '../components/HeaderSectionAuth';
import FooterSection from '../components/FooterSection';

export default function CartPage() {
  const { isAuthenticated } = useContext(AuthContext);
  // ดึง updateQuantity และ removeFromCart มาจาก Context
  const { cartItems, isLoading, refreshCart, updateQuantity, removeFromCart } = useCart(); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // ตรวจสอบการล็อกอิน
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // สั่งให้ Context ดึงข้อมูลตะกร้าล่าสุดจาก Database
    refreshCart();
  }, [isAuthenticated, navigate, refreshCart]);

  // ฟังก์ชันอัปเดตจำนวนสินค้า
  const handleQuantityChange = async (productNumber, quantity) => {
    try {
      setError(null); // เคลียร์ error เก่าก่อนเริ่มทำงาน
      await updateQuantity(productNumber, quantity);
    } catch (error) {
      setError(error.message || 'ไม่สามารถอัพเดทจำนวนได้');
    }
  };

  // ฟังก์ชันลบสินค้า
  const handleRemove = async (productNumber) => {
    try {
      setError(null);
      await removeFromCart(productNumber);
    } catch (error) {
      setError(error.message || 'ไม่สามารถลบสินค้าได้');
    }
  };

  const handleCheckout = () => navigate('/checkout'); // ไปหน้า Mock Payment

  return (
    <>
      <Header />
      <HeaderSectionAuth />
      <main className="font-kanit bg-neutral-lighter min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl font-bold text-content-dark mb-6">ตะกร้าสินค้า</h1>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-error-lighter text-error-base text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-20 text-content-soft">กำลังโหลด...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-content-soft text-lg mb-4">ตะกร้าสินค้าว่างเปล่า</p>
              <Link to="/allproducts" className="button">เลือกซื้อสินค้า</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productNumber} 
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
              <div className="lg:col-span-1">
                <OrderSummary items={cartItems} onCheckout={handleCheckout} />
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}