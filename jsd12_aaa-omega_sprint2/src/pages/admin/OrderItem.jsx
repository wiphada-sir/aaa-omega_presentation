import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchOrderByNumber } from "../../api/admin/order";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, DataNotFound, PageLoading } from "../../components/common/NotFound";
import { StatusOrder } from "../../components/admin/common/SelectStatus";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

const orderInitial = {
  internalNote: ""
};

export default function AdminOrderItem() {

  const { handleOrderStatusChange, handleOrderSave, handleOrderDelete, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { orderNumber } = useParams();

  const [orderForm, setOrderForm] = useState(orderNumber ? null : orderInitial);

  const handleOrderItemChange = (event) => {
    setOrderForm((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }));
  };
  const handleOrderItemStatusChange = async (event) => {
    const status = event.target.value;
    setOrderForm((prev) => ({ ...prev, status }));
    const updated = await handleOrderStatusChange(orderForm?._id, status);
    if (updated) setOrderForm(updated);
  };
  const handleOrderItemSubmit = async (event) => {
    event.preventDefault();
    const updated = await handleOrderSave(orderForm?._id, orderForm?.internalNote);
    if (updated) {
      setOrderForm(updated);
    };
  };
  const handleOrderItemDelete = async () => {
    const confirmed = window.confirm("ต้องการลบคำสั่งซื้อนี้หรือไม่?");
    if (!confirmed) return;
    const success = await handleOrderDelete(orderForm?._id);
    if (success) {
      navigate("/admin/orders");
    };
  };

  useEffect(() => {
    if (!orderNumber) return;
    const getOrder = async () => {
      const data = await fetchOrderByNumber(orderNumber);
      if (!data) {
        setOrderForm(false);
        return;
      } else {
        setOrderForm(data);
      };
    };
    getOrder();
  }, [orderNumber]);

  if (orderForm === false) return <PageNotFound text="ไม่พบหน้าคำสั่งซื้อ" />;
  if (orderNumber && orderForm === null) return <PageLoading />;

  return (
    <>
      <section id="orderEdit" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1>รายละเอียดคำสั่งซื้อ: {orderForm?.orderNumber ? <span className="text-content-hover">{orderForm?.orderNumber?.toUpperCase()}</span> : <DataNotFound />}</h1>
        {orderForm?.status && <StatusOrder value={orderForm?.status || ""} onChange={handleOrderItemStatusChange} />}
        <table className="table-responsive">
          <colgroup>
            <col className="w-px" />
            <col className="w-auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>วันที่สั่งซื้อ</th>
              <td>{orderForm?.createdAt ? FormatDate(orderForm?.createdAt) : <DataNotFound />}</td>
            </tr>
            <tr>
              <th>ชื่อผู้สั่งชื่อ</th>
              <td>
                {orderForm?.customer?.firstName || orderForm?.customer?.lastName
                  ? `${orderForm?.customer?.firstName} ${orderForm?.customer?.lastName}`.trim()
                  : <DataNotFound />}
              </td>
            </tr>
            {orderForm?.customer?.company &&
              <tr>
                <th>ชื่อบริษัท</th>
                <td>{orderForm?.customer?.company}</td>
              </tr>
            }
            {orderForm?.customer?.taxId &&
              <tr>
                <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                <td>{orderForm?.customer?.taxId}</td>
              </tr>
            }
            <tr>
              <th>เบอร์ติดต่อ</th>
              <td>{orderForm?.customer?.phone || <DataNotFound />}</td>
            </tr>
            {orderForm?.customer?.phone2 &&
              <tr>
                <th>เบอร์สำรอง</th>
                <td>{orderForm?.customer?.phone2}</td>
              </tr>
            }
            <tr>
              <th>อีเมล</th>
              <td>{orderForm?.customer?.email || <DataNotFound />}</td>
            </tr>
            <tr>
              <th>ที่อยู่จัดส่ง</th>
              <td>
                {[
                  orderForm?.customer?.shippingAddress?.addressLine,
                  orderForm?.customer?.shippingAddress?.subdistrict,
                  orderForm?.customer?.shippingAddress?.district,
                  orderForm?.customer?.shippingAddress?.province,
                  orderForm?.customer?.shippingAddress?.postcode
                ].filter(Boolean).join(' ') || <DataNotFound />}
              </td>
            </tr>
            {orderForm.orderNote &&
              <tr>
                <th>หมายเหตุ:</th>
                <td>{orderForm?.orderNote}</td>
              </tr>
            }
          </tbody>
        </table>
        <div className="table-container">
          <table>
            <colgroup>
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">รายการ</th>
                <th scope="col">รหัสสินค้า</th>
                <th scope="col" className="text-right">จำนวน</th>
                <th scope="col" className="text-right">ราคา/หน่วย</th>
                <th scope="col" className="text-right">ราคารวม</th>
              </tr>
            </thead>
            <tbody>
              {orderForm?.items?.map((item) => (
                <tr key={item?.productNumber}>
                  <td>{item?.name || <DataNotFound />}</td>
                  <td>{item?.sku || <DataNotFound />}</td>
                  <td className="text-right">{item?.quantity > 0 ? item?.quantity : <DataNotFound />}</td>
                  <td className="text-right">{item?.priceAtPurchase >= 0 ? FormatPrice(item?.priceAtPurchase) : <DataNotFound />}</td>
                  <td className="text-right">{item?.priceAtPurchase >= 0 && item?.quantity > 0 ? FormatPrice(item?.priceAtPurchase * item?.quantity) : <DataNotFound />}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-neutral-disable">
                <td></td>
                <th colSpan="3">ยอดรวมสุทธิ</th>
                <td className="text-right">{orderForm?.totalPrice >= 0 ? FormatPrice(orderForm?.totalPrice) : <DataNotFound />}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <form className="lg:grow self-start lg:w-1/2" onSubmit={handleOrderItemSubmit}>
          <div className="input-group">
            <label htmlFor="internalNote">โน้ตภายใน:</label>
            <textarea id="internalNote" name="internalNote" rows="5" value={orderForm?.internalNote || ""} onChange={handleOrderItemChange} placeholder="กรอกข้อความตามต้องการ?"></textarea>
          </div>
          <div className="button-row max-xs:flex-col xs:justify-between">
            <div className="input-group xs:flex-row-reverse xs:w-fit gap-5">
              <button type="submit" className="button w-full xs:w-fit">บันทึกข้อมูล</button>
              <button type="button" className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
            </div>
            {orderForm?.orderNumber &&
              <div className="input-group xs:w-fit">
                <hr className="xs:hidden my-5" />
                <button type="button" className="button button-soft button-error w-full xs:w-fit" onClick={handleOrderItemDelete}>ลบคำสั่งซื้อนี้</button>
              </div>
            }
          </div>
        </form>
        <Toast {...toast} />
      </section>
    </>
  );

};