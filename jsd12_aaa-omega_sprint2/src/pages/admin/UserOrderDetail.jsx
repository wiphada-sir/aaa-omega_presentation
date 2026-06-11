import { /*useContext,*/ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchOrderByNumber } from "../../api/admin/order";
import { PageNotFound, DataNotFound, PageLoading } from "../../components/common/NotFound";
import { StatusOrder } from "../../components/admin/common/SelectStatus";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

const orderInitial = {
  internalNote: ""
};

export default function AdminUserOrderDetail() {

  //const { orders } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { orderNumber } = useParams();
  //const order = orderNumber ? orders.find((item) => item.orderNumber === orderNumber) : null;

  const [orderForm, setOrderForm] = useState(orderNumber ? null : orderInitial);

  useEffect(() => {
    if (!orderNumber) return;
    const getOrder = async () => {
      const data = await fetchOrderByNumber(orderNumber);
      if (!data) {
        setOrderForm(false);
        return;
      } else {
        setOrderForm(data);
      }
    };
    getOrder();
  }, [orderNumber]);

  if (orderForm === false) return <PageNotFound text="ไม่พบหน้าคำสั่งซื้อ" />;
  if (orderNumber && orderForm === null) return <PageLoading />;

  return (
    <>
      <section id="orderView" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1>รายละเอียดคำสั่งซื้อ: {orderForm?.orderNumber ? <span className="text-content-hover">{orderForm?.orderNumber?.toUpperCase()}</span> : <DataNotFound />}</h1>
        {orderForm?.status && <StatusOrder value={orderForm.status || ""} />}
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
                  orderForm?.customer?.shippingAddress?.postcode,
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
        {orderForm.internalNote &&
          <table className="table-responsive">
            <colgroup>
              <col className="w-px" />
              <col className="w-auto" />
            </colgroup>
            <tbody>
                <tr>
                  <th><span className="badge badge-primary">โน้ตภายใน:</span></th>
                  <td>{orderForm.internalNote}</td>
                </tr>
            </tbody>
          </table>
        }
        <button type="button" className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
      </section>
    </>
  );

};