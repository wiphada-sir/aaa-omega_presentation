import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import StatCard from "../../components/admin/common/StatCard";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, DataNotFound } from "../../components/common/NotFound";
import { StatusOrder } from "../../components/admin/common/SelectStatus";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

export default function AdminOrders() {

  const { orders, handleOrderStatusChange, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleOrderItem = (orderNumber) => navigate(`./${orderNumber}`);
  
  const latestOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); /*.slice(0, 10)*/

  return (
    <>
      {orders?.length > 0
        ? <>
            <section id="stat">
              <StatCard title="ยอดขาย/เดือน" value="1,543,500" subtext="+18%" />
              <StatCard title="จำนวนออเดอร์" value="10" subtext="+6" />
              <StatCard title="มูลค่าเฉลี่ยต่อออเดอร์" value="154,350" subtext="-5%" />
              <StatCard title="ยอดขายรายชิ้น" value="13,500" subtext="3 ออเดอร์" />
              <StatCard title="ยอดขายยกชุด" value="1,530,000" subtext="7 ออเดอร์" />
              <StatCard title="กำไรโดยประมาณ" value="463,050" subtext="30%" />
            </section>
            <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>รายการคำสั่งซื้อ</h1>
              <div className="table-container">
                <table>
                  <colgroup>
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-auto" />
                    <col className="w-px" />
                    <col className="w-px" />
                  </colgroup> 
                  <thead>
                    <tr>
                      <th scope="col">วันที่สั่งซื้อ</th>
                      <th scope="col">เลขที่คำสั่งซื้อ</th>
                      <th scope="col">ชื่อผู้สั่งซื้อ</th>
                      <th scope="col" className="text-right">ยอดรวม</th>
                      <th scope="col">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestOrders.map((order) => (
                      <tr key={order?._id}>
                        <td>{order?.createdAt ? FormatDate(order?.createdAt) : <DataNotFound />}</td>
                        <td><button onClick={() => handleOrderItem(order?.orderNumber)}>{order?.orderNumber.toUpperCase() || <DataNotFound />}</button></td>
                        <td><button onClick={() => handleOrderItem(order?.orderNumber)}>
                          {order?.customer?.company ||
                            (order?.customer?.firstName || order?.customer?.lastName
                              ? `${order?.customer?.firstName} ${order?.customer?.lastName}`.trim()
                              : <DataNotFound />)
                          }</button>
                        </td>
                        <td className="text-right">{order?.totalPrice >= 0 ? FormatPrice(order?.totalPrice) : <DataNotFound />}</td>
                        <td>
                          <StatusOrder value={order.status || ""} onChange={(event) => handleOrderStatusChange(order?._id, event.target.value)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Toast {...toast} />
              </div>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าคำสั่งซื้อ" />
      }
    </>
  );

};