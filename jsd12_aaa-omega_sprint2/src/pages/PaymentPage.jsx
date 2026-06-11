import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  // จำลองการประมวลผลจ่ายเงิน 3 วินาที แล้วเด้งกลับหน้าแรก
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
      // โชว์ข้อความสำเร็จแล้ว ค่อยพากลับหน้าโฮม
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-kanit">
      <div className="bg-white p-10 rounded-3xl shadow-lg max-w-md w-full text-center">
        {isProcessing ? (
          <div className="flex flex-col items-center">
            {/* วงกลมโหลดหมุนๆ */}
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#5C6AC4] rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">กำลังประมวลผลการชำระเงิน</h2>
            <p className="text-gray-500">กรุณารอสักครู่ ห้ามปิดหน้าต่างนี้...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn">
            {/* ไอคอนติ๊กถูกสีเขียว */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">ชำระเงินสำเร็จ!</h2>
            <p className="text-gray-500">ขอบคุณที่อุดหนุนสินค้าของเราครับ</p>
            <p className="text-sm text-gray-400 mt-4">กำลังพากลับสู่หน้าหลัก...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;