import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import StatCard from "../../components/admin/common/StatCard";
import { PageNotFound, DataNotFound, ImageNotFound } from "../../components/common/NotFound";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

export default function AdminProducts() {

  const { products } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleProductItem = (productNumber) => navigate(`./${productNumber}`);

  return (
    <>
      {products?.length > 0
        ? <>
            <section id="stat">
              <StatCard title="สินค้าใกล้หมด" value="12" subtext="รายการ" />
              <StatCard title="สินค้าใหม่เดือนนี้" value="48" subtext="รายการ" />
              <StatCard title="มูลค่าสินค้าคงคลัง" value="4.2" subtext="ล้านบาท" />
              <StatCard title="สินค้าทั้งหมด" value="84" subtext="รายการ" />
            </section>
            <section id="productList" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>คลังสินค้า</h1>
              <Link className="button button-soft button-primary w-full xs:w-fit" to="./create">เพิ่มสินค้าใหม่</Link>
              <div className="table-container">
                <table>
                  <colgroup>
                    <col className="w-px" />
                    <col className="w-auto" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                  </colgroup> 
                  <thead>
                    <tr>
                      <th scope="col"><span className="block w-15">รูปภาพ</span></th>
                      <th scope="col">ชื่อสินค้า / รหัสสินค้า</th>
                      <th scope="col" className="text-right">สต็อก</th>
                      <th scope="col" className="text-right">ราคา</th>
                      <th scope="col">หมวดหมู่</th>
                      <th scope="col" className="text-right">วันที่เพิ่มสินค้า</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr key={product?._id}>
                        <td>
                          <button className="product-stock__image" onClick={() => handleProductItem(product?.productNumber)}>
                            <img className="object-cover size-15 min-w-15 min-h-15" src={product?.image?.url || ImageNotFound} />
                          </button></td>
                        <td>
                          <button className="product-stock__name" onClick={() => handleProductItem(product?.productNumber)}>{product?.name || <DataNotFound />}</button>
                          <div className="product-stock__meta">
                            <span className="product-stock__sku">{product?.sku?.toUpperCase() || <DataNotFound />}</span>
                            {product?.tags?.length > 0 &&
                              <>
                                <span className="product-stock__separator">•</span>
                                <ul className="product-stock__tag">
                                  {product?.tags?.map((tag, index) => (
                                    <li key={index} className="badge badge-soft badge-content">{tag}</li>
                                  ))}
                                </ul>
                              </>
                            }
                          </div>
                        </td>
                        <td className={`text-right ${product?.stock <= product?.stockMin ? "text-warning-base" : ""}`}>{product.stock || <DataNotFound />}</td>
                        <td className="text-right">{product?.price >= 0 ? FormatPrice(product.price) : <DataNotFound />}</td>
                        <td className="capitalize">{product?.category || <DataNotFound />}</td>
                        <td className="text-right">{product?.createdAt ? FormatDate(product?.createdAt) : <DataNotFound />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าสินค้า" />
      }
    </>
  );

};