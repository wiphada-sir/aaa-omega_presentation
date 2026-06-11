import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = ["อินเวอร์เตอร์", "แผงโซล่าร์เซลล์", "แบตเตอรี่", "อุปกรณ์เสริม", "โซล่าร์เซลล์เต็มระบบ"];

function ProductHighlight() {
  const navigate = useNavigate();

  // 1. สร้าง State สำหรับรับข้อมูลสินค้าและสถานะโหลด
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 2. ดึงข้อมูลสินค้าจริงทั้งหมดจาก API หลังบ้าน
  useEffect(() => {
    fetch('https://jsd12-aaa-omega.onrender.com/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        
        const productsArray = Array.isArray(data) ? data : data.data || [];
        setDbProducts(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching highlights:', err);
        setLoading(false);
      });
  }, []);

  // 3. กรองสินค้าในแต่ละแท็บ (จับคู่คำศัพท์แท็บภาษาไทยกับข้อมูล Category ภาษาอังกฤษใน DB)
  const filteredProducts = useMemo(() => {
    return dbProducts.filter((product) => {
      if (activeTab === "อินเวอร์เตอร์") return product.category === "Inverter";
      if (activeTab === "แผงโซล่าร์เซลล์") return product.category === "Solar Panel";
      if (activeTab === "แบตเตอรี่") return product.category === "Battery";
      if (activeTab === "อุปกรณ์เสริม") return product.category === "Accessories";
      if (activeTab === "โซล่าร์เซลล์เต็มระบบ") return product.category === "Solar Set";
      return true;
    });
  }, [dbProducts, activeTab]);

  const handleViewAll = () => {
    navigate("/allproducts");
  };

  return (
    <section id="product" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="container mx-auto">
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          สินค้าและโซลูชัน
        </h2>

        {/* เมนูแท็บสำหรับการเปลี่ยนประเภทสินค้า */}
        <div className="overflow-x-auto pb-8 flex justify-center">
          <div className="inline-flex min-w-max items-center border border-blue-500 rounded-xl p-1 bg-white shadow-sm">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${activeTab === tab
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ส่วนของการจัดวางการ์ดสินค้าแสดงผล */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">กำลังดึงข้อมูลสินค้าไฮไลท์...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                onClick={() => navigate(`/product/${product._id}`)} // กดแล้วลิงก์เข้าหน้าละเอียดตัวมันทันที
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
              >
                {/* ดึงรูปภาพหลักสินค้าจริงที่อยู่บน Cloudinary มาโชว์ */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b">
                  {product.image?.url ? (
                    <img 
                      src={product.image.url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">ไม่มีรูปภาพสินค้า</span>
                  )}
                </div>
                
                <div className="p-4 text-left grow flex flex-col justify-between">
                  <h3 className="font-semibold text-sm text-gray-700 line-clamp-2 h-10 leading-snug">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline justify-between">
                    <p className="text-blue-600 font-bold text-base">
                      ฿{product.price?.toLocaleString()}
                    </p>
                    {product.brand && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400">เร็วๆ นี้ พบกับสินค้าในหมวดหมู่นี้จากเรา</p>
          </div>
        )}

      </div>

      {/* ปุ่มด้านล่างสุดสำหรับกดไปดูสินค้าทั้งหมด */}
      <div className="flex justify-center mt-10 md:mt-12">
        <button 
          onClick={handleViewAll}
          className="border-2 border-blue-500 text-blue-500 px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium hover:bg-blue-500 hover:text-white transition-all shadow-sm"
        >
          ดูสินค้าทั้งหมด
        </button>
      </div>
    </section>
  );
}

export default ProductHighlight;