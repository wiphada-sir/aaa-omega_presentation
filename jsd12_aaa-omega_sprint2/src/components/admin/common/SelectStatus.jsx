import { TextNotFound } from "../../common/NotFound";

export const StatusOrder = ({ id, value, onChange }) => {

  const status = {
    "": { text:"ไม่พบข้อมูล", color:"button-soft button-content" },
    open: { text:"รอชำระเงิน", color:"button-soft button-content" },
    paid: { text:"ชำระเงินแล้ว", color:"button-outline button-success" },
    preparing: { text:"กำลังเตรียมสินค้า", color:"button-outline button-warning" },
    shipping: { text:"กำลังจัดส่ง", color:"button-outline button-accent" },
    delivered: { text:"จัดส่งสำเร็จ", color:"button-success" },
    cancelled: { text:"ยกเลิกคำสั่งซื้อ", color:"button-soft button-error" },
  };

  return (
    onChange
      ? <select id={id} className={`button ${status[value]?.color || ""}`} name="status" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกสถานะ</option>
          {Object.entries(status).map(([key, item]) => key 
            ? <option key={key} value={key}>{item.text}</option>
            : null
          )}
        </select>
      : <span className={`cursor-default button ${status[value]?.color || ""}`}>{status[value]?.text || TextNotFound}</span>
  );

};

export const StatusService = ({ id, value, onChange }) => {

  const status = {
    "": { text:"ไม่พบข้อมูล", color:"button-soft button-content" },
    request_received: { text:"รับคำขอ", color:"button-soft button-content" },
    scheduled: { text:"นัดหมายแล้ว", color:"button-outline button-success" },
    in_progress: { text:"กำลังดำเนินการ", color:"button-outline button-accent" },
    completed: { text:"ปิดงานแล้ว", color:"button-success" },
    rescheduled: { text:"เลื่อนนัด", color:"button-outline button-warning" },
    cancelled: { text:"ยกเลิกงาน", color:"button-soft button-error" },
  };

  return (
    onChange
      ? <select id={id} className={`button ${status[value]?.color || ""}`} name="status" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกสถานะ</option>
          {Object.entries(status).map(([key, item]) => key 
            ? <option key={key} value={key}>{item.text}</option>
            : null
          )}
        </select>
      : <span className={`cursor-default button ${status[value]?.color || ""}`}>{status[value]?.text || TextNotFound}</span>
  );

};

export const ServiceType = ({ id, value, onChange }) => {

  const type = {
    "": "ไม่พบข้อมูล",
    install: "ติดตั้ง",
    clean: "ล้างแผง",
    maintenance: "ซ่อมบำรุง",
  };

  return (
    onChange
      ? <select id={id} name="serviceType" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกประเภท</option>
          {Object.entries(type).map(([key, item]) => key 
            ? <option key={key} value={key}>{item}</option>
            : null
          )}
        </select>
      : type[value] || TextNotFound
  );

};

export const ServiceTeam = ({ id, value, onChange }) => {

  const team = {
    "": "ไม่พบข้อมูล",
    team1: "ทีม 1",
    team2: "ทีม 2",
    team3: "ทีม 3",
  };

  return (
    onChange
      ? <select id={id} name="team" value={value} onChange={onChange}>
          <option value="" disabled hidden>เลือกทีม</option>
          {Object.entries(team).map(([key, item]) => key 
            ? <option key={key} value={key}>{item}</option>
            : null
          )}
        </select>
      : team[value] || TextNotFound
  );

};