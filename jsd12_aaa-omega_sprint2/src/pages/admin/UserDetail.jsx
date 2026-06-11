import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchUserByNumber } from "../../api/admin/user";
import { PageNotFound, DataNotFound, PageLoading } from "../../components/common/NotFound";
import { StatusOrder } from "../../components/admin/common/SelectStatus";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

export default function AdminUserDetail() {

  const { isDev, orders } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleOrderItem = (orderNumber) => navigate(`./${orderNumber}`);
  const handleBack = () => navigate(-1);

  const { userNumber } = useParams();

  const [user, setUser] = useState(null);
  //const user = userProfile.find((item) => item.userNumber === Number(userNumber));
  const userOrders = userNumber ? orders.filter((item) => item?.customer?.userNumber === Number(userNumber)) : [];
  const latestUserOrders = [...userOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); /*.slice(0, 10)*/
  
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserByNumber(userNumber);
      if (!data) {
        setUser(false);
        return;
      } else {
        setUser(data);
      }
    };
    getUser();
  }, [userNumber]);
  
  if (user === false) return <PageNotFound text="ไม่พบหน้าบัญชี" />;
  if (userNumber && user === null) return <PageLoading />;

  return (
    <>
        <section id="userDetail" className="flex flex-row flex-wrap justify-between items-center gap-10">
          <h1>รายละเอียดบัญชี</h1>
          <Link className="button button-soft button-primary w-full xs:w-fit" to="./edit">แก้ไขข้อมูลผู้ใช้</Link>
          <table className="table-responsive">
            <colgroup>
              <col className="w-px" />
              <col className="w-auto" />
            </colgroup>
            <tbody>
              <tr>
                <th>ชื่อผู้สั่งชื่อ</th>
                <td>
                  {`${user?.firstName} ${user?.lastName}`.trim() || <DataNotFound />}</td>
              </tr>
              {user?.company &&
                <tr>
                  <th>ชื่อบริษัท</th>
                  <td>{user?.company}</td>
                </tr>
              }
              {user?.taxId &&
                <tr>
                  <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                  <td>{user?.taxId}</td>
                </tr>
              }
              <tr>
                <th>เบอร์ติดต่อ</th>
                <td>{user?.phone || <DataNotFound />}</td>
              </tr>
              {user?.phone2 &&
                <tr>
                  <th>เบอร์สำรอง</th>
                  <td>{user?.phone2}</td>
                </tr>
              }
              <tr>
                <th>อีเมล</th>
                <td>{user?.email || <DataNotFound />}</td>
              </tr>
              <tr>
                <th>ที่อยู่</th>
                <td>
                  {user?.address
                    ? <>
                        {user?.address?.label && <span className="badge badge-soft badge-primary mr-2">{user?.address?.label}</span>}
                        <span>
                          {[
                            user?.address?.addressLine,
                            user?.address?.subdistrict,
                            user?.address?.district,
                            user?.address?.province,
                            user?.address?.postcode
                          ].filter(Boolean).join(' ') || <DataNotFound />}
                        </span>
                      </>
                    : <DataNotFound />}
                </td>
              </tr>
              <tr>
                <th>ที่อยู่จัดส่ง</th>
                <td>
                  {user?.shippingAddress
                    ? <>
                        {user?.shippingAddress?.label && <span className="badge badge-soft badge-primary mr-2">{user?.shippingAddress?.label}</span>}
                        <span>
                          {[
                            user?.shippingAddress?.addressLine,
                            user?.shippingAddress?.subdistrict,
                            user?.shippingAddress?.district,
                            user?.shippingAddress?.province,
                            user?.shippingAddress?.postcode
                          ].filter(Boolean).join(' ') || <DataNotFound />}
                        </span>
                      </>
                    : <DataNotFound />}
                </td>
              </tr>
              <tr>
                <th>ที่อยู่บริการ</th>
                <td>
                  {user?.serviceAddress
                    ? <>
                        {user?.serviceAddress?.label && <span className="badge badge-soft badge-primary mr-2">{user?.serviceAddress?.label}</span>}
                        <span>
                          {[
                            user?.serviceAddress?.addressLine,
                            user?.serviceAddress?.subdistrict,
                            user?.serviceAddress?.district,
                            user?.serviceAddress?.province,
                            user?.serviceAddress?.postcode
                          ].filter(Boolean).join(' ') || <DataNotFound />}
                        </span>
                      </>
                    : <DataNotFound />}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
          <h2>รายการคำสั่งซื้อ</h2>
          <div className="table-container">
            <table>
              <colgroup>
                <col className="w-px" />
                {isDev && <col className="w-px" />}
                <col className="w-auto" />
                <col className="w-px" />
                <col className="w-px" />
              </colgroup> 
              <thead>
                <tr>
                  <th scope="col">วันที่สั่งซื้อ</th>
                  <th scope="col">เลขที่คำสั่งซื้อ</th>
                  {isDev &&
                    <th scope="col" className="relative bg-neutral-50/60">ชื่อผู้สั่งซื้อ
                      <span className="badge badge-outline badge-content absolute bottom-0 left-2 xl:left-5 translate-y-1/2 text-[10px] leading-2.25 tracking-widest bg-white">PREVIEW</span></th>
                  }
                  <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                  <th scope="col">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {userOrders?.length > 0
                  ? <>
                      {latestUserOrders.map((order) => (
                        <tr key={order?._id}>
                          <td>{order?.createdAt ? FormatDate(order?.createdAt) : <DataNotFound />}</td>
                          <td><button onClick={() => handleOrderItem(order?.orderNumber)}>{order?.orderNumber?.toUpperCase() || <DataNotFound />}</button></td>
                          {isDev &&
                            <td className="bg-neutral-50/60"><button onClick={() => handleOrderItem(order?.orderNumber)}>
                              {order?.customer?.company ||
                                (order?.customer?.firstName || order?.customer?.lastName
                                  ? `${order?.customer?.firstName} ${order?.customer?.lastName}`.trim()
                                  : <DataNotFound />)
                              }</button>
                            </td>
                          }
                          <td className="text-right">{order?.totalPrice >= 0 ? FormatPrice(order?.totalPrice) : <DataNotFound />}</td>
                          <td>
                            <StatusOrder value={order?.status || ""} />
                          </td>
                        </tr>
                      ))}
                    </>
                  : <tr>
                      <td colSpan={isDev ? "5" : "4"} className="text-center"><DataNotFound /></td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
        <button className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
    </>
  );

};