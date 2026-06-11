import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* 1. หุ้มส่วนรูปภาพด้วย Link (เปลี่ยนเป็น product._id) */}
      <Link to={`/product/${product?._id}`} className="relative aspect-square bg-gray-50 overflow-hidden block">
        {product?.image?.url ? (
          <img 
            src={product.image.url} 
            alt={product.name || "Solar Product"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          /* กรณีไม่มีรูปภาพจริงในฐานข้อมูล ให้แสดงกล่องดักบอกว่าไม่พบรูปแทนเว็บพัง */
          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2 border border-gray-200">
            <span className="material-symbols-outlined text-4xl">image_not_supported</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Image not found</span>
          </div>
        )}
        
        {/* Warranty Badge (ถอด .split() ออกเพราะเป็นตัวเลขตรงๆ แล้ว) */}
        {product?.warranty && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-soft text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-gray-100">
            Warranty {product.warranty} Years
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex grow flex-col">
        {product?.brand && (
          <span className="text-accent-hover text-xs font-bold uppercase tracking-wider mb-1">
            {product.brand}
          </span>
        )}
        
        {/* 2. หุ้มชื่อสินค้าด้วย Link (เปลี่ยนเป็น product._id และใส่ Fallback ป้องกันชื่อว่าง) */}
        <Link to={`/product/${product?._id}`}>
          <h3 className="text-content-hover font-semibold text-sm md:text-base line-clamp-2 mb-3 h-10 md:h-12 hover:text-primary-soft transition-colors">
            {product?.name || "สินค้าโซล่าร์เซลล์"}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-primary-soft font-bold text-lg">
              {/* ดักกรณีราคาไม่มีในระบบ ให้ขึ้นบอกติดต่อเจ้าหน้าที่ */}
              {product?.price ? `฿${product.price.toLocaleString()}` : "ติดต่อเจ้าหน้าที่"}
            </span>
            {/* เช็คความปลอดภัยของราคาก่อนเอาไปคำนวณเปรียบเทียบ */}
            {product?.salePrice && product?.price && product.salePrice > product.price && (
              <span className="text-gray-400 text-xs line-through">
                ฿{product.salePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;