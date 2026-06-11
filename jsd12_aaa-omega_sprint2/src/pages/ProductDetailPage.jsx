import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    fetch(`https://jsd12-aaa-omega.onrender.com/api/v1/products/${productId}`)
      .then((res) => res.json())
      .then((resData) => {
        const actualProduct = resData?.data || resData;
        setProduct(actualProduct);
        if (actualProduct) {
          if (actualProduct.gallery && actualProduct.gallery.length > 0) {
            setActiveImage(actualProduct.gallery[0].url);
          } else if (actualProduct.image?.url) {
            setActiveImage(actualProduct.image.url);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center p-24 text-2xl font-kanit text-gray-500">
        กำลังโหลดรายละเอียดสินค้า...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-24 text-2xl font-kanit">
        ขออภัย ไม่พบสินค้าในระบบครับ
      </div>
    );
  }

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    try {
      if (!product.productNumber) {
        alert("ไม่สามารถเพิ่มสินค้าได้: ไม่พบรหัส productNumber");
        return;
      }
      await addToCart(product.productNumber, quantity);
      alert("เพิ่มสินค้าลงรถเข็นเรียบร้อยแล้ว!");
    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาด กรุณาล็อกอินก่อนทำรายการ");
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!product.productNumber) {
        alert("ไม่สามารถสั่งซื้อได้: ไม่พบรหัส productNumber");
        return;
      }
      await addToCart(product.productNumber, quantity);
      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาด กรุณาล็อกอินก่อนทำรายการ");
    }
  };

  return (
    <div className="font-kanit bg-[#F8F9FA] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-8 rounded-3xl shadow-sm">
          {/* ฝั่งซ้าย: รูปภาพ */}
          <div className="lg:col-span-6 flex gap-4">
            {product.gallery && product.gallery.length > 0 && (
              <div className="hidden md:flex flex-col gap-3">
                {product.image?.url && (
                  <img
                    src={product.image.url}
                    className={`w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-primary-base ${activeImage === product.image.url ? "border-[#5C6AC4] ring-2 ring-indigo-100" : ""}`}
                    onClick={() => setActiveImage(product.image.url)}
                    alt="main-thumb"
                  />
                )}
                {product.gallery.map((imgObj, i) => (
                  <img
                    key={i}
                    src={imgObj.url}
                    className={`w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-primary-base ${activeImage === imgObj.url ? "border-[#5C6AC4] ring-2 ring-indigo-100" : ""}`}
                    onClick={() => setActiveImage(imgObj.url)}
                    alt={`thumb-${i}`}
                  />
                ))}
              </div>
            )}

            <div className="flex-1 aspect-square bg-gray-50 rounded-2xl border overflow-hidden flex items-center justify-center">
              {activeImage || product.image?.url ? (
                <img
                  src={activeImage || product.image?.url}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-5xl">
                    image_not_supported
                  </span>
                  <span className="text-sm font-semibold uppercase">
                    Image not found
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ฝั่งขวา: รายละเอียดสินค้า */}
          <div className="lg:col-span-6">
            {product.brand && (
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.brand}
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mt-4 leading-tight">
              {product.name || "สินค้า"}
            </h1>

            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-extrabold text-[#5C6AC4]">
                ฿{((product.salePrice && product.price && product.salePrice < product.price) ? product.salePrice : product.price)?.toLocaleString() || "ติดต่อเจ้าหน้าที่"}
              </span>
              {product.salePrice && product.price && product.salePrice < product.price && (
                <span className="text-gray-400 line-through">
                  ฿{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mt-4 text-gray-600 leading-relaxed text-sm">
              {product.description || "ไม่มีข้อมูลคำอธิบายสำหรับสินค้านี้"}
            </div>

            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-700">จำนวน:</span>
                <div className="flex items-center bg-white border rounded-xl overflow-hidden">
                  <button onClick={handleDecrease} className="px-4 py-2 hover:bg-gray-100 transition-colors">-</button>
                  <input type="text" value={quantity} readOnly className="w-12 text-center font-bold" />
                  <button onClick={handleIncrease} className="px-4 py-2 hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">ราคารวม:</span>
                <span className="text-xl font-bold text-gray-800">
                  ฿{((product.price || 0) * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* ปุ่มใส่รถเข็น และ ซื้อเลย */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button 
                onClick={handleAddToCart} 
                className="py-4 px-6 border-2 border-[#5C6AC4] text-[#5C6AC4] rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-cart-shopping"></i> ใส่ในรถเข็น
              </button>
              <button 
                onClick={handleBuyNow} 
                className="py-4 px-6 bg-[#5C6AC4] text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                ซื้อเลย
              </button>
            </div>
          </div>
        </div>

        {/* ส่วนล่าง: Specs & Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">รายละเอียดทางเทคนิค</h3>
            <div className="space-y-3">
              {product.specs && product.specs.length > 0 ? (
                product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-semibold text-gray-800">{spec.value}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">ไม่มีข้อมูลทางเทคนิคของสินค้านี้</p>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">จุดเด่นสินค้า</h3>
            <ul className="space-y-4">
              {product.features && product.features.length > 0 ? (
                product.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="text-green-500 font-bold">✓</span> {feature}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm">ไม่มีข้อมูลสำหรับสินค้านี้</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
