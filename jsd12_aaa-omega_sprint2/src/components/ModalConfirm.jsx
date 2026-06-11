import { useNavigate } from "react-router-dom";

const ModalConfirm = ({ isOpen, status, onClose, orderNumber }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleFinish = () => {
    onClose();
    navigate('/'); // จ่ายเสร็จพากลับหน้าแรก
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-xl animate-fadeIn">
        {status === 'loading' ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">กำลังดำเนินการ...</h2>
            <p className="text-gray-500 text-sm">กรุณารอสักครู่ ระบบกำลังยืนยันคำสั่งซื้อ</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">สั่งซื้อสำเร็จ!</h2>
            <p className="text-gray-500 mb-4">หมายเลขคำสั่งซื้อ: <br/><span className="font-bold text-blue-600">{orderNumber}</span></p>
            <button 
              onClick={handleFinish}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConfirm;