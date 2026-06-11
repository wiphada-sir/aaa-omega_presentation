import { useContext, useState/*, useEffect*/ } from 'react';
import ShippingOption from '../components/ShippingOption';
import PaymentOption from '../components/PaymentOption'; 
import ModalConfirm from '../components/ModalConfirm'; 
import { useCart } from '../contexts/CartContext'; 
//import { getMyProfile } from '../utils/api'; 
import { createOrder } from '../api/admin/order';
import AuthContext from '../contexts/authContext/AuthContext';

const PaymentPage = () => {
  const { user, loading } = useContext(AuthContext);

  // เพิ่ม clearCart เข้ามา เพื่อเอาไว้ล้างตะกร้าตอนสั่งซื้อเสร็จ
  const { cartItems, clearCart } = useCart(); 
  //const [userData, setUserData] = useState(user || null);
  //const [loading, setLoading] = useState(true);

  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('bank_transfer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  
  // เพิ่ม State สำหรับเก็บเลขที่ออเดอร์ที่ได้จาก Backend
  const [createdOrderNumber, setCreatedOrderNumber] = useState("");
  //console.log(user, setUserData, setLoading)
  // ดึงข้อมูลลูกค้าจาก Backend
   /*useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMyProfile();
        setUserData(user.data);
      } catch (err) {
        console.error("ดึงข้อมูลผู้ใช้ไม่สำเร็จ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);*/

  const actualCartItems = cartItems || [];

  const totalItems = actualCartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = actualCartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  const handlePlaceOrder = async () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 1500);
    setPaymentStatus('loading');

    // สร้าง Payload ให้ตรงกับ Schema ของ Backend
    const orderData = {
      totalPrice: totalPrice,
      paymentMethod: selectedPayment, 
      customer: {
        userNumber: user?.userNumber,
        firstName: user?.firstName,
        lastName: user?.lastName,
        company: user?.company || "-",
        taxId: user?.taxId || "-",
        phone: user?.phone,
        phone2: user?.phone2 || "-",
        email: user?.email,
        shippingAddress: {
          label: user?.shippingAddress?.label || "บ้าน",
          addressLine: user?.shippingAddress?.addressLine || "-",
          subdistrict: user?.shippingAddress?.subdistrict || "-",
          district: user?.shippingAddress?.district || "-",
          province: user?.shippingAddress?.province || "-",
          postcode: user?.shippingAddress?.postcode || "-"
        }
      },
      items: actualCartItems.map(item => ({
        productNumber: item?.productNumber,
        name: item?.name || "สินค้าไม่มีชื่อ",
        sku: item?.sku || "na", 
        priceAtPurchase: item?.price || 0,
        quantity: item?.quantity || 1
      }))
    };

    console.log("ส่งข้อมูลสั่งซื้อไป Backend:", orderData);

    try {
      const result = await createOrder(orderData); 
      
      if (result) {
        setPaymentStatus('success');
        // เก็บเลขที่ออเดอร์จาก Backend มาโชว์ (ถ้าโครงสร้าง Backend ส่งมาเป็น result.orderNumber หรือ result.data.orderNumber)
        setCreatedOrderNumber(result.orderNumber || result.data?.orderNumber || "สำเร็จ");
        
        // เคลียร์ตะกร้าสินค้า
        if (clearCart) {
          clearCart();
        }
      } else {
        throw new Error("ระบบไม่ตอบสนอง");
      }
    } catch (error) {
      console.error("สั่งซื้อล้มเหลว:", error);
      setPaymentStatus('error');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">ชำระเงิน (Checkout)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-6">
            
            {/* 1. ที่อยู่จัดส่ง */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">ที่อยู่ในการจัดส่ง</h2>
              {loading ? (
                <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
              ) : user ? (
                <div className="text-gray-600">
                  <p className="font-semibold text-gray-800">
                    {user?.firstName} {user?.lastName} 
                    <span className="text-sm font-normal text-gray-500 ml-2">({user.phone})</span>
                  </p>
                  <p className="mt-1">
                    {user?.address?.addressLine || ""} {user?.address?.district || ""} {user?.address?.province || ""}
                  </p>
                </div>
              ) : (
                <p className="text-red-500">ไม่พบข้อมูลผู้ใช้งาน</p>
              )}
            </div>

            {/* 2. รายการสินค้า */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รายการสินค้า</h2>
              <div className="space-y-4">
                {actualCartItems.length > 0 ? (
                  actualCartItems.map((item, index) => (
                    <div key={item.productNumber || index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-gray-500">จำนวน: {item.quantity} ชิ้น</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 ml-4">฿{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">ไม่มีสินค้าในตะกร้า</p>
                )}
              </div>
            </div>

            {/* 3. ตัวเลือกการจัดส่ง */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">ตัวเลือกการจัดส่ง</h2>
              <ShippingOption id="standard" title="Standard Delivery" description="จัดส่งแบบมาตรฐาน" days="3-5" selected={selectedShipping === 'standard'} onSelect={setSelectedShipping} />
              <ShippingOption id="bulky" title="Standard Delivery Bulky" description="จัดส่งสินค้าขนาดใหญ่พิเศษ" days="5-7" selected={selectedShipping === 'bulky'} onSelect={setSelectedShipping} />
              <ShippingOption id="ems" title="EMS ภายในประเทศ" description="จัดส่งด่วนพิเศษ (ไปรษณีย์ไทย)" days="1-2" selected={selectedShipping === 'ems'} onSelect={setSelectedShipping} />
            </div>

            {/* 4. ช่องทางการชำระเงิน */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">วิธีการชำระเงิน</h2>
              <PaymentOption id="bank_transfer" title="โอนเงินผ่านธนาคาร" icon="🏦" selected={selectedPayment === 'bank_transfer'} onSelect={setSelectedPayment} />
              <PaymentOption id="cash" title="เงินสด (เก็บเงินปลายทาง)" icon="💵" selected={selectedPayment === 'cash'} onSelect={setSelectedPayment} />
              <PaymentOption id="card" title="Credit / Debit Card" icon="💳" selected={selectedPayment === 'card'} onSelect={setSelectedPayment} />
              <PaymentOption id="qr" title="Mobile Banking (สแกน QR Code)" icon="📱" selected={selectedPayment === 'qr'} onSelect={setSelectedPayment} />
            </div>
          </div>

          {/* คอลัมน์ขวา */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลการชำระเงิน</h2>
              <div className="space-y-3 text-sm text-gray-600 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                  <span>฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-bold">ฟรี</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
                <span className="text-2xl font-bold text-blue-600">฿{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={totalItems === 0 || loading}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors text-lg ${
                  totalItems > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                สั่งสินค้า
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ส่ง orderNumber ที่ดึงมาจาก Backend ไปโชว์ใน Modal แทนการ Fix ค่า */}
      <ModalConfirm 
        isOpen={isModalOpen} 
        status={paymentStatus} 
        onClose={handleCloseModal} 
        orderNumber={createdOrderNumber || "กำลังดำเนินการ..."} 
      />
    </div>
  );
};

export default PaymentPage;