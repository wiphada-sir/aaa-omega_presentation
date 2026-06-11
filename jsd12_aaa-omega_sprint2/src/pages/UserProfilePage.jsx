import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext/AuthContext";
import { fetchUserOrders } from "../utils/api";

const getStatusText = (status) => {
  const statusMap = {
    open: "รอดำเนินการ",
    paid: "ชำระเงินแล้ว",
    preparing: "กำลังเตรียมจัดส่ง",
    shipping: "กำลังจัดส่ง",
    delivered: "จัดส่งสำเร็จ",
    cancelled: "ยกเลิกแล้ว"
  };
  return statusMap[status] || status;
};

const formatAddress = (addr, userObj = null) => {
  if (!addr && !userObj) return "ไม่พบข้อมูล";
  
  if (addr && typeof addr === 'object') {
    const parts = [addr.address, addr.subDistrict, addr.district, addr.province, addr.postalCode].filter(Boolean);
    if (parts.length > 0) return parts.join(" ");
  } else if (typeof addr === 'string') {
    if (userObj) {
      const parts = [addr, userObj.subDistrict, userObj.district, userObj.province, userObj.postalCode].filter(Boolean);
      if (parts.length > 0) return parts.join(" ");
    }
    return addr;
  }
  return "ไม่พบข้อมูล";
};

export default function UserProfilePage() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const getInitialFormData = (usr) => {
    const getAddrField = (addrObj, field, fallback = "") => {
      if (addrObj && typeof addrObj === 'object') return addrObj[field] || "";
      return fallback || "";
    };

    return {
      fullName: usr ? ([usr.firstName, usr.lastName].filter(Boolean).join(" ") || usr.fullName || "") : "",
      phone: usr?.phone || "",
      phoneBackup: usr?.phoneBackup || "",
      email: usr?.email || "",
      companyName: usr?.companyName || "",
      taxId: usr?.taxId || "",
      
      address: getAddrField(usr?.address, 'address', typeof usr?.address === 'string' ? usr.address : ""),
      subDistrict: getAddrField(usr?.address, 'subDistrict', usr?.subDistrict),
      district: getAddrField(usr?.address, 'district', usr?.district),
      province: getAddrField(usr?.address, 'province', usr?.province),
      postalCode: getAddrField(usr?.address, 'postalCode', usr?.postalCode),
      addressLabel: getAddrField(usr?.address, 'label', ""),

      shippingAddress: getAddrField(usr?.shippingAddress, 'address', ""),
      shippingSubDistrict: getAddrField(usr?.shippingAddress, 'subDistrict', ""),
      shippingDistrict: getAddrField(usr?.shippingAddress, 'district', ""),
      shippingProvince: getAddrField(usr?.shippingAddress, 'province', ""),
      shippingPostalCode: getAddrField(usr?.shippingAddress, 'postalCode', ""),
      shippingLabel: getAddrField(usr?.shippingAddress, 'label', ""),

      serviceAddress: getAddrField(usr?.serviceAddress, 'address', ""),
      serviceSubDistrict: getAddrField(usr?.serviceAddress, 'subDistrict', ""),
      serviceDistrict: getAddrField(usr?.serviceAddress, 'district', ""),
      serviceProvince: getAddrField(usr?.serviceAddress, 'province', ""),
      servicePostalCode: getAddrField(usr?.serviceAddress, 'postalCode', ""),
      serviceLabel: getAddrField(usr?.serviceAddress, 'label', ""),
    };
  };

  const [formData, setFormData] = useState(() => getInitialFormData(user));
  const [prevUser, setPrevUser] = useState(user);
  const [savedMessage, setSavedMessage] = useState("");
  const [orders, setOrders] = useState([]);

  // อัปเดต State ทันทีในจังหวะ Render (Derived State) แทนการใช้ useEffect
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setFormData(getInitialFormData(user));
    }
  }

  useEffect(() => {
    if (user?.userNumber) {
      fetchUserOrders(user.userNumber)
        .then(data => setOrders(data))
        .catch(err => console.error("Failed to fetch orders:", err));
    }
  }, [user?.userNumber]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nameParts = (formData.fullName || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    
    const updatedData = {
      ...formData,
      firstName,
      lastName,
      address: {
        address: formData.address,
        subDistrict: formData.subDistrict,
        district: formData.district,
        province: formData.province,
        postalCode: formData.postalCode,
        label: formData.addressLabel,
      },
      shippingAddress: {
        address: formData.shippingAddress,
        subDistrict: formData.shippingSubDistrict,
        district: formData.shippingDistrict,
        province: formData.shippingProvince,
        postalCode: formData.shippingPostalCode,
        label: formData.shippingLabel,
      },
      serviceAddress: {
        address: formData.serviceAddress,
        subDistrict: formData.serviceSubDistrict,
        district: formData.serviceDistrict,
        province: formData.serviceProvince,
        postalCode: formData.servicePostalCode,
        label: formData.serviceLabel,
      }
    };
    
    updateProfile(updatedData);
    setSavedMessage("บันทึกข้อมูลเรียบร้อยแล้ว");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function handleCancel() {
    if (user) {
      setFormData(getInitialFormData(user));
    }
    setSavedMessage("ยกเลิกการแก้ไขเรียบร้อยแล้ว");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleGoHome() {
    navigate("/");
  }

  return (
    <main className="max-w-250 mx-auto p-5 font-['Kanit'] bg-neutral-50 text-content-dark">
      <section className="mb-10 pb-10 border-b border-neutral-soft">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-primary-base">รายละเอียดบัญชี</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <a href="#form" className="button button-primary">
              <span className="icon-material">edit</span> แก้ไขข้อมูลผู้ใช้
            </a>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={handleGoHome} className="button button-soft button-primary">
                เข้าสู่หน้าหลัก
              </button>
              <button type="button" onClick={handleLogout} className="button button-soft button-content">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-4 text-lg">
          <div className="font-medium text-content-dark">ชื่อผู้สั่งชื่อ</div>
          <div className="text-content-soft">{[user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.fullName || "ไม่พบข้อมูล"}</div>

          {user?.companyName && (
            <>
              <div className="font-medium text-content-dark">ชื่อบริษัท</div>
              <div className="text-content-soft">{user.companyName}</div>
            </>
          )}

          {user?.taxId && (
            <>
              <div className="font-medium text-content-dark">เลขประจำตัวผู้เสียภาษี</div>
              <div className="text-content-soft">{user.taxId}</div>
            </>
          )}

          <div className="font-medium text-content-dark">เบอร์ติดต่อ</div>
          <div className="text-content-soft">{user?.phone || "ไม่พบข้อมูล"}</div>

          <div className="font-medium text-content-dark">เบอร์ติดต่อ (สำรอง)</div>
          <div className="text-content-soft">{user?.phoneBackup || "-"}</div>

          <div className="font-medium text-content-dark">อีเมล</div>
          <div className="text-content-soft">{user?.email || "ไม่พบข้อมูล"}</div>

          <div className="font-medium text-content-dark">ที่อยู่</div>
          <div className="text-content-soft">
            {formatAddress(user?.address, user)}
          </div>

          <div className="font-medium text-content-dark">ที่อยู่จัดส่ง</div>
          <div className="text-content-soft">
            {formatAddress(user?.shippingAddress)}
          </div>

          <div className="font-medium text-content-dark">ที่อยู่บริการ</div>
          <div className="text-content-soft">
            {formatAddress(user?.serviceAddress)}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-primary-base mt-10 mb-6">รายการคำสั่งซื้อ</h2>
        <div className="table-container overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col">วันที่สั่งซื้อ</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                <th scope="col" className="text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map((order) => (
                <tr key={order._id || order.orderNumber}>
                  <td>{new Date(order.createdAt).toLocaleDateString("th-TH")}</td>
                  <td>{order.orderNumber?.toUpperCase()}</td>
                  <td className="text-right">{order.totalPrice?.toLocaleString()}</td>
                  <td className="text-right">
                    <span className={`badge badge-pill ${order.status === 'cancelled' ? 'text-red-500 bg-red-100' : order.status === 'delivered' ? 'badge-success' : 'text-blue-500 bg-blue-100'}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center text-neutral-soft py-4">ไม่มีประวัติคำสั่งซื้อ</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section id="form" className="mt-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-primary-base">แก้ไขข้อมูลบัญชี</h2>
          <div className="flex gap-2">
            <button type="button" onClick={handleCancel} className="button button-soft button-content">
              ยกเลิก
            </button>
            <button type="submit" form="profileForm" className="button button-primary">
              บันทึกข้อมูล
            </button>
          </div>
        </div>

        {savedMessage && <p className="mb-4 text-sm text-primary-base">{savedMessage}</p>}

        <form id="profileForm" className="space-y-6" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">ชื่อบุคคล / บริษัท</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="phone">เบอร์ติดต่อ</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="phoneBackup">เบอร์ติดต่อ (สำรอง)</label>
              <input type="tel" id="phoneBackup" name="phoneBackup" value={formData.phoneBackup} onChange={handleChange} placeholder="000-000-0000" />
            </div>
            <div className="input-group">
              <label htmlFor="email">อีเมล</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <fieldset className="border-t border-neutral-soft pt-6 mt-6">
            <legend className="text-lg font-medium text-content-dark px-2">สำหรับบริษัท/องค์กร</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="companyName">ชื่อบริษัท</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษีอากร</label>
                <input type="text" id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-neutral-soft pt-6 mt-6">
            <legend className="text-lg font-medium text-content-dark px-2">ที่อยู่ของคุณ (สำหรับงานเอกสาร)</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="address">ที่อยู่</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="subDistrict">แขวง / ตำบล</label>
                <input type="text" id="subDistrict" name="subDistrict" value={formData.subDistrict} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="district">เขต / อำเภอ</label>
                <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} />
              </div>
            </div>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="province">จังหวัด</label>
                <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="postalCode">รหัสไปรษณีย์</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="addressLabel">ป้ายกำกับ</label>
                <input type="text" id="addressLabel" name="addressLabel" value={formData.addressLabel} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-neutral-soft pt-6 mt-6">
            <legend className="text-lg font-medium text-content-dark px-2">ที่อยู่ (สำหรับจัดส่งสินค้า)</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="shippingAddress">ที่อยู่</label>
                <input type="text" id="shippingAddress" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="shippingSubDistrict">แขวง / ตำบล</label>
                <input type="text" id="shippingSubDistrict" name="shippingSubDistrict" value={formData.shippingSubDistrict} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="shippingDistrict">เขต / อำเภอ</label>
                <input type="text" id="shippingDistrict" name="shippingDistrict" value={formData.shippingDistrict} onChange={handleChange} />
              </div>
            </div>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="shippingProvince">จังหวัด</label>
                <input type="text" id="shippingProvince" name="shippingProvince" value={formData.shippingProvince} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="shippingPostalCode">รหัสไปรษณีย์</label>
                <input type="text" id="shippingPostalCode" name="shippingPostalCode" value={formData.shippingPostalCode} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="shippingLabel">ป้ายกำกับ</label>
                <input type="text" id="shippingLabel" name="shippingLabel" value={formData.shippingLabel} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-neutral-soft pt-6 mt-6">
            <legend className="text-lg font-medium text-content-dark px-2">ที่อยู่ (สำหรับบริการ)</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="serviceAddress">ที่อยู่</label>
                <input type="text" id="serviceAddress" name="serviceAddress" value={formData.serviceAddress} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="serviceSubDistrict">แขวง / ตำบล</label>
                <input type="text" id="serviceSubDistrict" name="serviceSubDistrict" value={formData.serviceSubDistrict} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="serviceDistrict">เขต / อำเภอ</label>
                <input type="text" id="serviceDistrict" name="serviceDistrict" value={formData.serviceDistrict} onChange={handleChange} />
              </div>
            </div>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="serviceProvince">จังหวัด</label>
                <input type="text" id="serviceProvince" name="serviceProvince" value={formData.serviceProvince} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="servicePostalCode">รหัสไปรษณีย์</label>
                <input type="text" id="servicePostalCode" name="servicePostalCode" value={formData.servicePostalCode} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="serviceLabel">ป้ายกำกับ</label>
                <input type="text" id="serviceLabel" name="serviceLabel" value={formData.serviceLabel} onChange={handleChange} />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
