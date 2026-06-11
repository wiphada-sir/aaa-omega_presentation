import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { fetchServiceByNumber } from "../../api/admin/service";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, DataNotFound, ImageNotFound, PageLoading } from "../../components/common/NotFound";
import { StatusService, ServiceType, ServiceTeam } from "../../components/admin/common/SelectStatus";
import { FormatDateTime } from "../../utils/FormatDate";

const serviceInitial = {
  //appointmentAt: "",
  appointmentDate: "",
  appointmentTime: "",
  serviceType: "",
  team: "",
  status: "",
  title: "",
  description: "",
  image: {
    url: "",
    cloudinaryId: ""
  },
  internalNote: "",
  customer: {
    userNumber: "",
    firstName: "",
    lastName: "",
    company: "",
    taxId: "",
    phone: "",
    phone2: "",
    email: "",
    serviceAddress: {
      label: "",
      addressLine: "",
      subdistrict: "",
      district: "",
      province: "",
      postcode: ""
    }
  }
};

export default function AdminServiceForm() {

  const { users, handleServiceStatusChange, handleServiceSave, handleServiceDelete, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { serviceNumber } = useParams();

  const [serviceForm, setServiceForm] = useState(serviceNumber ? null : serviceInitial);

  const prepareServiceDataAtSliced = (data) => {
    if (!data) return null;
    //const { appointmentAt, ...cleanData } = data;
    const appointmentDate = data.appointmentAt ? new Date(data.appointmentAt).toISOString().slice(0, 10) : "";
    const appointmentTime = data.appointmentAt ? new Date(data.appointmentAt).toISOString().slice(11, 16) : "";
    return { ...data, appointmentDate, appointmentTime };
  };
  const prepareServiceDataAtCombined = (data) => {
    if (!data) return null;
    const { appointmentDate, appointmentTime, ...cleanData } = data;
    return { ...cleanData, appointmentAt:
      appointmentDate && appointmentTime
        ? new Date(`${appointmentDate}T${appointmentTime}:00`).toISOString()
        : null
    };
  };
  const handleServiceItemChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, [event.target.name]: event.target.value
    }));
  };
  const handleServiceItemImageChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, image: {
        ...prev.image, [event.target.name]: event.target.value
      }
    }));
  };
  const handleServiceItemCustomerChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        ...prev.customer, [event.target.name]: event.target.value
      }
    }));
  }
  const handleServiceItemAddressChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        ...prev.customer, serviceAddress: {
          ...prev.customer.serviceAddress, [event.target.name]: event.target.value
        }
      }
    }));
  };
  const handleServiceItemStatusChange = async (event) => {
    const status = event.target.value;
    setServiceForm((prev) => ({ ...prev, status }));
    const updated = await handleServiceStatusChange( serviceForm?._id, status );
    if (updated) setServiceForm(updated);
  };
  const handleServiceItemSubmit = async (event) => {
    event.preventDefault();
    const updated = await handleServiceSave(serviceForm?._id, prepareServiceDataAtCombined(serviceForm));
    if (updated) {
      setServiceForm(prepareServiceDataAtSliced(updated));
    };
  };
  const handleServiceItemDelete = async () => {
    const confirmed = window.confirm("ต้องการลบบริการนี้หรือไม่?");
    if (!confirmed) return;
    const success = await handleServiceDelete(serviceForm?._id);
    if (success) {
      navigate("/admin/services");
    };
  };

  // Search section
  const [searchForm, setSearchForm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const handleSearchChange = (event) => {
    setSearchForm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const keyword = searchForm.trim().toLowerCase();
    if (!keyword) {setSearchResult([]); return;}
    const result = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(keyword) ||
             user.company?.toLowerCase().includes(keyword) ||
             user.phone?.includes(keyword) ||
             user.phone2?.includes(keyword) ||
             user.email?.toLowerCase().includes(keyword);
    });
    setSearchResult(result);
  };
  const handleSelectUser = (user) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        userId: user.userId,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        company: user.company || "",
        taxId: user.taxId || "",
        phone: user.phone || "",
        phone2: user.phone2 || "",
        email: user.email || "",
        serviceAddress: {
          label: user.serviceAddress.label || "",
          addressLine: user.serviceAddress.addressLine || "",
          subdistrict: user.serviceAddress.subdistrict || "",
          district: user.serviceAddress.district || "",
          province: user.serviceAddress.province || "",
          postcode: user.serviceAddress.postcode || ""
        }
      }
    }));
    setSearchForm("");
    setSearchResult(null);
  };

  useEffect(() => {
    if (!serviceNumber) return;
    const getService = async () => {
      const data = await fetchServiceByNumber(serviceNumber);
      if (!data) {
        setServiceForm(false);
        return;
      } else {
        setServiceForm(prepareServiceDataAtSliced(data));
      };
    };
    getService();
  }, [serviceNumber]);

  if (serviceForm === false) return <PageNotFound text="ไม่พบหน้าบริการ" />;
  if (serviceNumber && serviceForm === null) return <PageLoading />;

  return (
    <>
      <section id="serviceForm" className="flex flex-row flex-wrap justify-between items-center gap-10">
        <h1>{serviceForm?.serviceNumber ? "รายละเอียดนัดหมาย" : "เพิ่มนัดหมายใหม่"} {serviceForm?.serviceNumber ? <span className="text-content-hover">{serviceForm?.serviceNumber?.toUpperCase()}</span> : <DataNotFound />}</h1>
        {serviceForm?.status && <StatusService value={serviceForm?.status || ""} onChange={handleServiceItemStatusChange} />}
        {!serviceNumber &&
          <section id="searchUser" className="flex flex-col gap-5 w-full p-5 rounded-2xl border border-primary-light hover:border-primary-disable transition-all">
            <form onSubmit={handleSearchSubmit}>
              <div className="input-row 2xs:flex-row justify-end lg:w-[calc(50%-10px)]">
                <div className="input-group grow">
                  <label htmlFor="serviceSearchAccount">ค้นหาลูกค้า
                    <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ค้นหาด้วย: ชื่อ-นามสกุล, บริษัท, เบอร์โทร, อีเมล"><span className="icon-material">info_i</span></span></label>
                  <input type="text" id="serviceSearchAccount" name="serviceSearchAccount" value={searchForm} onChange={handleSearchChange} placeholder="สมชาย ใจดี" maxLength="120" />
                </div>
                <div className="input-group 2xs:w-fit self-end">
                  <button type="submit" className="button button-soft button-primary"><span className="icon-material">search</span> ค้นหา</button>
                </div>
              </div>
            </form>
            {searchResult !== null &&
              (searchResult?.length > 0
                ? <section className="flex flex-wrap gap-5">
                    {searchResult?.map((user) => (
                      <button key={user?._id} type="button" className="card-search-result" onClick={() => handleSelectUser(user)}>
                        {user?.firstName || user?.lastName &&
                          <span>{`${user?.firstName} ${user?.lastName}`.trim()}</span>
                        }
                        {user?.company &&
                          <span>
                            <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">enterprise</span></span>
                            {user?.company}</span>
                        }
                        {user?.phone &&
                          <span>
                            <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">phone</span></span>
                            {user?.phone}</span>
                        }
                        {user?.phone2 &&
                          <span>
                            <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">phone</span></span>
                            {user?.phone2}</span>
                        }
                        {user?.email &&
                          <span>
                            <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">email</span></span>
                            {user?.email}</span>
                        }
                      </button>
                    ))}
                  </section>
                : <DataNotFound />
              )
            }
          </section>
        }
        {serviceForm?.serviceNumber &&
          <>
            <table className="table-responsive">
              <colgroup>
                <col className="w-px" />
                <col className="w-auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th>วันที่นัดหมาย</th>
                  <td>{serviceForm?.appointmentAt ? FormatDateTime(serviceForm?.appointmentAt) : <DataNotFound />}</td>
                </tr>
                <tr>
                  <th>ชื่อลูกค้า</th>
                  <td>
                    {serviceForm?.customer?.firstName || serviceForm?.customer?.lastName
                      ? `${serviceForm?.customer?.firstName} ${serviceForm?.customer?.lastName}`.trim()
                      : <DataNotFound />}
                  </td>
                </tr>
                {serviceForm?.customer?.company &&
                  <tr>
                    <th>ชื่อบริษัท</th>
                    <td>{serviceForm?.customer?.company}</td>
                  </tr>
                }
                {serviceForm?.customer?.taxId &&
                  <tr>
                    <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                    <td>{serviceForm?.customer?.taxId}</td>
                  </tr>
                }
                <tr>
                  <th>เบอร์ติดต่อ</th>
                  <td>{serviceForm?.customer?.phone || <DataNotFound />}</td>
                </tr>
                {serviceForm?.customer?.phone2 &&
                  <tr>
                    <th>เบอร์สำรอง</th>
                    <td>{serviceForm?.customer?.phone2}</td>
                  </tr>
                }
                <tr>
                  <th>อีเมล</th>
                  <td>{serviceForm?.customer?.email || <DataNotFound />}</td>
                </tr>
                <tr>
                  <th>ที่อยู่นัดหมาย</th>
                  <td>
                    {[
                      serviceForm?.customer?.serviceAddress?.addressLine,
                      serviceForm?.customer?.serviceAddress?.subdistrict,
                      serviceForm?.customer?.serviceAddress?.district,
                      serviceForm?.customer?.serviceAddress?.province,
                      serviceForm?.customer?.serviceAddress?.postcode
                    ].filter(Boolean).join(' ') || <DataNotFound />}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
          </>
        }
        <form onSubmit={handleServiceItemSubmit}>
          {!serviceForm &&
            <>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="firstName">ชื่อจริง</label>
                  <input type="text" id="firstName" name="firstName" value={serviceForm.customer.firstName || ""} onChange={handleServiceItemCustomerChange} placeholder="สมชาย" maxLength="120" required />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">นามสกุล</label>
                  <input type="text" id="lastName" name="lastName" value={serviceForm.customer.lastName || ""} onChange={handleServiceItemCustomerChange} placeholder="ใจดี" maxLength="120" required />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="email">อีเมล</label>
                  <input type="email" id="email" name="email" value={serviceForm.customer.email || ""} onChange={handleServiceItemCustomerChange} placeholder="account@email.com" maxLength="120" required />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">เบอร์ติดต่อ</label>
                  <input type="tel" id="phone" name="phone" value={serviceForm.customer.phone || ""} onChange={handleServiceItemCustomerChange} placeholder="081-000-0000" minLength="10" maxLength="20" />
                </div>
                <div className="input-group">
                  <label htmlFor="phone2">เบอร์ติดต่อ
                    <span className="text-xs text-content-soft">(สำรอง)</span></label>
                  <input type="tel" id="phone2" name="phone2" value={serviceForm.customer.phone2 || ""} onChange={handleServiceItemCustomerChange} placeholder="099-000-0000" minLength="10" maxLength="20" />
                </div>
              </div>
              <hr />
              <fieldset>
                <legend>สำหรับบริษัท/องค์กร</legend>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="company">ชื่อบริษัท</label>
                    <input type="text" id="company" name="company" value={serviceForm.customer.company || ""} onChange={handleServiceItemCustomerChange} placeholder="ระบุชื่อบริษัท" maxLength="120" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษีอากร</label>
                    <input type="text" id="taxId" name="taxId" value={serviceForm.customer.taxId || ""} onChange={handleServiceItemCustomerChange} placeholder="เลขประจำตัวผู้เสียภาษีอากร" maxLength="20" />
                  </div>
                </div>
              </fieldset>
              <hr />
              <fieldset>
                <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับรับบริการ)</span></legend>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="addressLine3">ที่อยู่</label>
                    <input type="text" id="addressLine3" name="addressLine" value={serviceForm.customer.serviceAddress.addressLine || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="subdistrict3">แขวง / ตำบล</label>
                    <input type="text" id="subdistrict3" name="subdistrict" value={serviceForm.customer.serviceAddress.subdistrict || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุแขวง / ตำบล" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="district3">เขต / อำเภอ</label>
                    <input type="text" id="district3" name="district" value={serviceForm.customer.serviceAddress.district || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุเขต / อำเภอ" />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="province3">จังหวัด</label>
                    <input type="text" id="province3" name="province" value={serviceForm.customer.serviceAddress.province || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุจังหวัด" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="postcode3">รหัสไปรษณีย์</label>
                    <input type="text" id="postcode3" name="postcode" value={serviceForm.customer.serviceAddress.postcode || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="label3">ป้ายกำกับ</label>
                    <input type="text" id="label3" name="label" value={serviceForm.customer.serviceAddress.label || ""} onChange={handleServiceItemAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
                  </div>
                </div>
              </fieldset>
              <hr />
            </>
          }
          <div className="input-col grow xl:w-[calc(50%-10px)] self-start">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="appointmentDate">วันที่นัดหมาย
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="รูปแบบ: วัน/เดือน/ปี ค.ศ."><span className="icon-material">info_i</span></span></label>
                <input type="date" id="appointmentDate" name="appointmentDate" value={serviceForm?.appointmentDate || ""} onChange={handleServiceItemChange} />
              </div>
              <div className="input-group">
                <label htmlFor="appointmentTime">เวลาที่นัดหมาย</label>
                <input type="time" id="appointmentTime" name="appointmentTime" value={serviceForm?.appointmentTime || ""} onChange={handleServiceItemChange} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="serviceType">ประเภทงาน</label>
                <ServiceType id="serviceType" value={serviceForm?.serviceType || ""} onChange={handleServiceItemChange} />
              </div>
              <div className="input-group">
                <label htmlFor="team">ทีมช่าง</label>
                <ServiceTeam id="team" value={serviceForm?.team || ""} onChange={handleServiceItemChange} />
              </div>
            </div>
            <div className="input-row sm:flex-row max-md:flex-wrap">
              <img className="object-cover size-17 min-w-17 min-h-17" src={serviceForm?.image?.url || ImageNotFound} />
              <div className="input-group max-md:order-3 md:w-[calc(75%-25px-68px)]">
                <label htmlFor="url">รูปภาพสินค้า
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="กรอก URL ของรูปภาพ"><span className="icon-material">info_i</span></span></label>
                <textarea id="url" className="min-h-10 md:min-h-15.5" name="url" rows="2" value={serviceForm?.image?.url || ""} onChange={handleServiceItemImageChange} placeholder="https://res.cloudinary.com/slug/image/upload/v8888/filename.png"></textarea>
              </div>
              <div className="input-group max-sm:order-4 sm:w-[calc(100%-20px-68px)] md:w-[calc(25%-15px)] md:shrink-0">
                <label htmlFor="cloudinaryId">ID ของรูปภาพ</label>
                <textarea id="cloudinaryId" className="min-h-10 md:min-h-15.5" name="cloudinaryId" rows="2" value={serviceForm?.image?.cloudinaryId || ""} onChange={handleServiceItemImageChange} placeholder="กรอก ID ของรูปภาพจาก cloudinary.com"></textarea>
              </div>
            </div>
          </div>
          <div className="input-col grow xl:w-[calc(50%-10px)] self-start">
            <div className="input-group">
              <label htmlFor="title">หัวเรื่อง</label>
              <input type="text" id="title" name="title" value={serviceForm?.title || ""} onChange={handleServiceItemChange} placeholder="ระบุเรื่องบริการ" maxLength="60" required />
            </div>
            <div className="input-group">
              <label htmlFor="description">รายละเอียด</label>
              <textarea id="description" name="description" rows="5" value={serviceForm?.description || ""} onChange={handleServiceItemChange} placeholder="กรอกรายละเอียด?"></textarea>
            </div>
            <div className="input-group">
              <label htmlFor="internalNote">โน้ตภายใน</label>
              <textarea id="internalNote" name="internalNote" rows="5" value={serviceForm?.internalNote || ""} onChange={handleServiceItemChange} placeholder="กรอกข้อความตามต้องการ?"></textarea>
            </div>
          </div>
          <div className="button-row max-xs:flex-col xs:justify-between">
            <div className="input-group xs:flex-row-reverse xs:w-fit gap-5">
              <button type="submit" className="button w-full xs:w-fit">{serviceForm?.serviceNumber ? "บันทึกข้อมูล" : "เพิ่มบริการ"}</button>
              <button type="button" className="button button-soft button-content w-full xs:w-fit" onClick={handleBack}><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</button>
            </div>
            {serviceForm?.serviceNumber &&
              <div className="input-group xs:w-fit">
                <hr className="xs:hidden my-5" />
                <button type="button" className="button button-soft button-error w-full xs:w-fit" onClick={handleServiceItemDelete}>ลบบริการนี้</button>
              </div>
            }
          </div>
        </form>
        <Toast {...toast} />
      </section>
    </>
  );

};