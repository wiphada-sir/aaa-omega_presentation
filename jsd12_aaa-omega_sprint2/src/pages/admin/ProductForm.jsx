import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchProductByNumber } from "../../api/admin/product";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, ImageNotFound, PageLoading } from "../../components/common/NotFound";

const productInitial = {
  name: "",
  sku: "",
  brand: "",
  category: "",
  warranty: "",
  description: "",
  specs: [], // new
  features: [], // new
  image: {
    url: "",
    cloudinaryId: ""
  },
  gallery: [], // new
  tags: "",
  price: "",
  salePrice: "",
  stock: "",
  stockMin: "",
};

export default function AdminProductForm() {

  const { handleProductSave, handleProductDelete, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { productNumber } = useParams();

  const [productForm, setProductForm] = useState(productNumber ? null : productInitial);
  const handleProductItemChange = (event) => {
    setProductForm((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }));
  };
  const handleProductItemImageChange = (event) => {
    setProductForm((prev) => ({
      ...prev, image: {
        ...prev.image, [event.target.name]: event.target.value
      }
    }));
  };
  const handleProductItemSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...productForm,
      warranty: Number(productForm?.warranty) || 0,
      tags: (productForm?.tags ?? "").split(",").map(tag => tag.trim()).filter(Boolean) || "",
      price: Number(productForm?.price) || 0,
      salePrice: Number(productForm?.salePrice) || 0,
      stock: Number(productForm?.stock) || 0,
      stockMin: Number(productForm?.stockMin) || 0,
    };
    const saved = await handleProductSave(productForm?._id, payload);
    if (saved) {
      if (productNumber) {
        setProductForm({
          ...saved,
          tags: Array.isArray(saved.tags) ? saved.tags.join(", ") : saved.tags ?? ""
        });
      } else {
        navigate(`/admin/products/${saved.productNumber}`);
      };
    };
  };
  const handleProductItemDelete = async () => {
    const confirmed = window.confirm("ต้องการลบสินค้านี้หรือไม่?");
    if (!confirmed) return;
    const success = await handleProductDelete(productForm?._id);
    if (success) {
      navigate("/admin/products");
    };
  };

  useEffect(() => {
    if (!productNumber) return;
    const getProduct = async () => {
      const data = await fetchProductByNumber(productNumber);
      if (!data) {
        setProductForm(false);
        return;
      } else {
        setProductForm({
          ...data,
          image: data.image ?? { url: "", cloudinaryId: "" },
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : ""
        });
      };
    };
    getProduct();
  }, [productNumber]);

  if (productForm === false) return <PageNotFound text="ไม่พบหน้าสินค้า" />;
  if (productNumber && productForm === null) return <PageLoading />;

  return (
    <>
      <section id="productForm" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h1>{productForm?.productNumber ? "รายละเอียดสินค้า" : "เพิ่มสินค้าใหม่"}</h1>
        <form onSubmit={handleProductItemSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">ชื่อสินค้า</label>
              <input type="text" id="name" name="name" value={productForm?.name || ""} onChange={handleProductItemChange} placeholder="ระบุชื่อสินค้าให้ชัดเจน" maxLength="120" required />
            </div>
            <div className="input-group">
              <label htmlFor="sku">รหัสสินค้า
                <span className="text-xs text-content-soft">(SKU)</span>
                <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุบด้วย a-z, 0-9 และขีด(-) เท่านั้น"><span className="icon-material">info_i</span></span></label>
              <input type="text" id="sku" name="sku" value={productForm?.sku || ""} onChange={handleProductItemChange} placeholder="ระบุรหัสสินค้า" pattern="[A-Za-z0-9\-]+" maxLength="50" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="brand">ยี่ห้อ</label>
              <input type="text" id="brand" name="brand" value={productForm?.brand || ""} onChange={handleProductItemChange} placeholder="ระบุยี่ห้อ/แบรนด์" maxLength="120" />
            </div>
            <div className="input-group">
              <label htmlFor="category">หมวดหมู่</label>
              <select id="category" name="category" value={productForm?.category || ""} onChange={handleProductItemChange} required>
                <option value="" disabled>เลือกหมวดหมู่</option>
                <option value="solar">แผงโซล่าเซลล์</option>
                <option value="inverter">อินเวอร์เตอร์</option>
                <option value="battery">แบตเตอรี่</option>
                <option value="accessory">อุปกรณ์เสริม</option>
              </select>
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="warranty">การรับประกัน
                <span className="text-xs text-content-soft">(ปี)</span></label>
              <input type="number" id="warranty" name="warranty" value={productForm?.warranty || ""} onChange={handleProductItemChange} placeholder="ระบุจำนวนปี" min="0" max="99" />
            </div>
            <div className="input-group">
              <label htmlFor="tags">แท็ก / ป้ายกำกับ
                <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ระบุคำ เช่น จุดเด่น หรือประเภท และคั่นด้วย ,"><span className="icon-material">info_i</span></span></label>
              <input type="text" id="tags" name="tags" value={productForm?.tags || ""} onChange={handleProductItemChange} placeholder="เช่น สินค้าขายดี, ประสิทธิภาพสูง" maxLength="150" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="price">ราคาสินค้า</label>
              <input type="number" id="price" name="price" value={productForm?.price || ""} onChange={handleProductItemChange} placeholder="ระบุราคาสินค้า" min="0" required />
            </div>
            <div className="input-group">
              <label htmlFor="salePrice">ราคาลดแล้ว</label>
              <input type="number" id="salePrice" name="salePrice" value={productForm?.salePrice || ""} onChange={handleProductItemChange} placeholder="ระบุราคาลดแล้ว" min="0" max={productForm?.price ? Number(productForm?.price) - 1 : undefined} />
            </div>
            <div className="input-group">
              <label htmlFor="stock">จำนวนสต็อก</label>
              <input type="number" id="stock" name="stock" value={productForm?.stock || ""} onChange={handleProductItemChange} placeholder="ระบุจำนวนคงเหลือ" min="0" required />
            </div>
            <div className="input-group">
              <label htmlFor="stockMin">สต็อกขั้นต่ำ</label>
              <input type="number" id="stockMin" name="stockMin" value={productForm?.stockMin || ""} onChange={handleProductItemChange} placeholder="ระบุจำนวนขั้นต่ำเพื่อแจ้งเตือน" min="0" />
            </div>
          </div>
          <hr />
          <div className="input-row sm:flex-row max-md:flex-wrap">
            <img className="object-cover size-17 min-w-17 min-h-17" src={productForm?.image?.url || ImageNotFound} />
            <div className="input-group max-md:order-3 md:w-[calc(75%-25px-68px)]">
              <label htmlFor="url">รูปภาพสินค้า
                <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="กรอก URL ของรูปภาพ"><span className="icon-material">info_i</span></span></label>
              <textarea id="url" className="min-h-10 md:min-h-15.5" name="url" rows="2" value={productForm?.image?.url || ""} onChange={handleProductItemImageChange} placeholder="https://res.cloudinary.com/slug/image/upload/v8888/filename.png"></textarea>
            </div>
            <div className="input-group max-sm:order-4 sm:w-[calc(100%-20px-68px)] md:w-[calc(25%-15px)] md:shrink-0">
              <label htmlFor="cloudinaryId">ID ของรูปภาพ</label>
              <textarea id="cloudinaryId" className="min-h-10 md:min-h-15.5" name="cloudinaryId" rows="2" value={productForm?.image?.cloudinaryId || ""} onChange={handleProductItemImageChange} placeholder="กรอก ID ของรูปภาพจาก cloudinary.com"></textarea>
            </div>
          </div>
          <hr />
          <div className="input-group">
            <label htmlFor="description">รายละเอียด</label>
            <textarea id="description" name="description" rows="5" value={productForm?.description || ""} onChange={handleProductItemChange} placeholder="ระบุคุณสมบัติ จุดเด่น การใช้งาน และการรับประกัน" maxLength="2000"></textarea>
          </div>
          <div className="button-row max-xs:flex-col xs:justify-between">
            <div className="input-group xs:flex-row-reverse xs:w-fit gap-5">
              <button type="submit" className="button w-full xs:w-fit">{productForm?.productNumber ? "บันทึกข้อมูล" : "เพิ่มสินค้า"}</button>
              <button type="button" className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
            </div>
            {productForm?.productNumber &&
              <div className="input-group xs:w-fit">
                <hr className="xs:hidden my-5" />
                <button type="button" className="button button-soft button-error w-full xs:w-fit" onClick={handleProductItemDelete}>ลบสินค้านี้</button>
              </div>
            }
          </div>
        </form>
        <Toast {...toast} />
      </section>
    </>
  );

};