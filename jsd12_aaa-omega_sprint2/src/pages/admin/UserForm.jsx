import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//import { AdminAuthContext } from "../../contexts/authAdminContext/authAdminContext";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchUserByNumber } from "../../api/admin/user";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, PageLoading } from "../../components/common/NotFound";

const userInitial = {
  firstName: "",
  lastName: "",
  company: "",
  taxId: "",
  phone: "",
  phone2: "",
  password: "",
  password2: "",
  email: "",
  role: "",
  address: {
    label:"",
    addressLine:"",
    subdistrict:"",
    district:"",
    province:"",
    postcode:""
  },
  shippingAddress: {
    label:"",
    addressLine:"",
    subdistrict:"",
    district:"",
    province:"",
    postcode:""
  },
  serviceAddress: {
    label: "",
    addressLine: "",
    subdistrict: "",
    district:"",
    province:"",
    postcode:""
  }
};

export default function AdminUserForm() {

  //const { user } = useContext(AdminAuthContext);
  const { handleUserSave, handleUserDelete, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { userNumber } = useParams();

  const [userForm, setUserForm] = useState(userNumber ? null : userInitial);

  //const isMyProfile = userForm?._id && user?._id && userForm?._id === user?._id;

  const handleUserItemChange = (event) => {
    setUserForm((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }));
  };
  const handleUserItemAddressChange = (event) => {
    setUserForm((prev) => ({
      ...prev, address: {
        ...prev.address, [event.target.name]: event.target.value
      }
    }));
  };
  const handleUserItemShippingAddressChange = (event) => {
    setUserForm((prev) => ({
      ...prev, shippingAddress: {
        ...prev.shippingAddress, [event.target.name]: event.target.value
      }
    }));
  }
  const handleUserItemServiceAddressChange = (event) => {
    setUserForm((prev) => ({
      ...prev, serviceAddress: {
        ...prev.serviceAddress, [event.target.name]: event.target.value
      }
    }));
  };
  const handleUserItemSubmit = async (event) => {
    event.preventDefault();
    if (!userForm?._id) {
      if (userForm?.password !== userForm?.password2) {
        alert("รหัสผ่านไม่ตรงกัน");
        return;
      };
    };
    const saved = await handleUserSave(userForm?._id, userForm);
    if (saved) {
      if (userNumber) {
        setUserForm(saved);
      } else {
        navigate(`/admin/users/${saved?.userNumber}/edit`);
      };
    };
  };
  const handleUserItemDelete = async () => {
    const confirmed = window.confirm("ต้องการลบบัญชีนี้หรือไม่?");
    if (!confirmed) return;
    const success = await handleUserDelete(userForm?._id);
    if (success) {
      navigate("/admin/users");
    };
  };
  
  useEffect(() => {
    if (!userNumber) return;
    const getUser = async () => {
      const data = await fetchUserByNumber(userNumber);
      if (!data) {
        setUserForm(false);
        return;
      } else {
        setUserForm(data);
      };
    };
    getUser();
  }, [userNumber]);

  if (userForm === false) return <PageNotFound text="ไม่พบหน้ารายละเอียดบัญชี" />;
  if (userNumber && userForm === null) return <PageLoading />;

  return (
    <>
      <section id="userForm" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1>{userForm?.userNumber ? "รายละเอียดบัญชี" : "สร้างบัญชีใหม่"}</h1>
        <form onSubmit={handleUserItemSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="firstName">ชื่อจริง</label>
              <input type="text" id="firstName" name="firstName" value={userForm?.firstName || ""} onChange={handleUserItemChange} placeholder="สมชาย" maxLength="120" required />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">นามสกุล</label>
              <input type="text" id="lastName" name="lastName" value={userForm?.lastName || ""} onChange={handleUserItemChange} placeholder="ใจดี" maxLength="120" required />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">อีเมล</label>
              <input type="email" id="email" name="email" value={userForm?.email || ""} onChange={handleUserItemChange} placeholder="account@email.com" maxLength="120" required />
            </div>
            <div className="input-group">
              <label htmlFor="phone">เบอร์ติดต่อ</label>
              <input type="tel" id="phone" name="phone" value={userForm?.phone || ""} onChange={handleUserItemChange} placeholder="081-000-0000" minLength="10" maxLength="20" />
            </div>
            <div className="input-group">
              <label htmlFor="phone2">เบอร์ติดต่อ
                <span className="text-xs text-content-soft">(สำรอง)</span></label>
              <input type="tel" id="phone2" name="phone2" value={userForm?.phone2 || ""} onChange={handleUserItemChange} placeholder="099-000-0000" minLength="10" maxLength="20" />
            </div>
          </div>
          <hr />
          {(!userForm?._id /*|| isMyProfile*/) &&
            <>
              <fieldset>
                <legend className="text-warning-base">ความปลอดภัย</legend>
                <div className="input-row p-5 rounded-2xl border border-warning-light hover:border-warning-disable transition-all">
                  <div className="input-group">
                    <label htmlFor="password">รหัสผ่าน</label>
                    <input type="password" id="password" name="password" value={userForm?.password || ""} onChange={handleUserItemChange} placeholder="••••••••" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password2">ยืนยันรหัสผ่าน</label>
                    <input type="password" id="password2" name="password2" value={userForm?.password2 || ""} onChange={handleUserItemChange} placeholder="••••••••" />
                  </div>
                </div>
              </fieldset>
              <hr />
            </>
          }
          <fieldset>
            <legend>สำหรับบริษัท/องค์กร</legend>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="company">ชื่อบริษัท</label>
                <input type="text" id="company" name="company" value={userForm?.company || ""} onChange={handleUserItemChange} placeholder="ระบุชื่อบริษัท" maxLength="120" />
              </div>
              <div className="input-group">
                <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษีอากร</label>
                <input type="text" id="taxId" name="taxId" value={userForm?.taxId || ""} onChange={handleUserItemChange} placeholder="เลขประจำตัวผู้เสียภาษีอากร" maxLength="20" />
              </div>
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>ที่อยู่ของคุณ <span className="text-xs text-content-soft">(สำหรับงานเอกสาร)</span></legend>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="addressLine">ที่อยู่</label>
                <input type="text" id="addressLine" name="addressLine" value={userForm?.address?.addressLine || ""} onChange={handleUserItemAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
              </div>
              <div className="input-group">
                <label htmlFor="subdistrict">แขวง / ตำบล</label>
                <input type="text" id="subdistrict" name="subdistrict" value={userForm?.address?.subdistrict || ""} onChange={handleUserItemAddressChange} placeholder="ระบุแขวง / ตำบล" />
              </div>
              <div className="input-group">
                <label htmlFor="district">เขต / อำเภอ</label>
                <input type="text" id="district" name="district" value={userForm?.address?.district || ""} onChange={handleUserItemAddressChange} placeholder="ระบุเขต / อำเภอ" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="province">จังหวัด</label>
                <input type="text" id="province" name="province" value={userForm?.address?.province || ""} onChange={handleUserItemAddressChange} placeholder="ระบุจังหวัด" />
              </div>
              <div className="input-group">
                <label htmlFor="postcode">รหัสไปรษณีย์</label>
                <input type="text" id="postcode" name="postcode" value={userForm?.address?.postcode || ""} onChange={handleUserItemAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
              </div>
              <div className="input-group">
                <label htmlFor="label">ป้ายกำกับ</label>
                <input type="text" id="label" name="label" value={userForm?.address?.label || ""} onChange={handleUserItemAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
              </div>
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับจัดส่งสินค้า)</span></legend>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="addressLine2">ที่อยู่</label>
                <input type="text" id="addressLine2" name="addressLine" value={userForm?.shippingAddress?.addressLine || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
              </div>
              <div className="input-group">
                <label htmlFor="subdistrict2">แขวง / ตำบล</label>
                <input type="text" id="subdistrict2" name="subdistrict" value={userForm?.shippingAddress?.subdistrict || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุแขวง / ตำบล" />
              </div>
              <div className="input-group">
                <label htmlFor="district2">เขต / อำเภอ</label>
                <input type="text" id="district2" name="district" value={userForm?.shippingAddress?.district || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุเขต / อำเภอ" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="province2">จังหวัด</label>
                <input type="text" id="province2" name="province" value={userForm?.shippingAddress?.province || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุจังหวัด" />
              </div>
              <div className="input-group">
                <label htmlFor="postcode2">รหัสไปรษณีย์</label>
                <input type="text" id="postcode2" name="postcode" value={userForm?.shippingAddress?.postcode || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
              </div>
              <div className="input-group">
                <label htmlFor="label2">ป้ายกำกับ</label>
                <input type="text" id="label2" name="label" value={userForm?.shippingAddress?.label || ""} onChange={handleUserItemShippingAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
              </div>
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับรับบริการ)</span></legend>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="addressLine3">ที่อยู่</label>
                <input type="text" id="addressLine3" name="addressLine" value={userForm?.serviceAddress?.addressLine || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
              </div>
              <div className="input-group">
                <label htmlFor="subdistrict3">แขวง / ตำบล</label>
                <input type="text" id="subdistrict3" name="subdistrict" value={userForm?.serviceAddress?.subdistrict || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุแขวง / ตำบล" />
              </div>
              <div className="input-group">
                <label htmlFor="district3">เขต / อำเภอ</label>
                <input type="text" id="district3" name="district" value={userForm?.serviceAddress?.district || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุเขต / อำเภอ" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="province3">จังหวัด</label>
                <input type="text" id="province3" name="province" value={userForm?.serviceAddress?.province || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุจังหวัด" />
              </div>
              <div className="input-group">
                <label htmlFor="postcode3">รหัสไปรษณีย์</label>
                <input type="text" id="postcode3" name="postcode" value={userForm?.serviceAddress?.postcode || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
              </div>
              <div className="input-group">
                <label htmlFor="label3">ป้ายกำกับ</label>
                <input type="text" id="label3" name="label" value={userForm?.serviceAddress?.label || ""} onChange={handleUserItemServiceAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
              </div>
            </div>
          </fieldset>
          <div className="button-row max-xs:flex-col xs:justify-between">
            <div className="input-group xs:flex-row-reverse xs:w-fit gap-5">
              <button type="submit" className="button w-full xs:w-fit">{userForm?.userNumber ? "บันทึกข้อมูล" : "สร้างบัญชี"}</button>
              <button type="button" className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span>ย้อนกลับ</button>
            </div>
            {userForm?.userNumber &&
              <div className="input-group xs:w-fit">
                <hr className="xs:hidden my-5" />
                <button type="button" className="button button-soft button-error w-full xs:w-fit" onClick={handleUserItemDelete}>ลบบัญชีนี้</button>
              </div>
            }
          </div>
        </form>
        <Toast {...toast} />
      </section>
    </>
  )
}