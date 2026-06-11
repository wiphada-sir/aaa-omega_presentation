import { useState } from 'react';
import Header from '../components/HeaderSection';
import HeaderSectionAuth from '../components/HeaderSectionAuth';
import FooterSection from '../components/FooterSection';
import lineIcon from '../assets/images/LINE_Brand_icon.png';
import bannerImg from '../assets/images/p-banner.jpg';

const contactInfo = [
  {
    icon: 'location_on',
    label: 'ที่อยู่',
    lines: ['89 ซอยลาดพร้าว 101', 'แขวงคลองจั่น เขตบางกะปิ', 'กรุงเทพมหานคร 10240'],
  },
  {
    icon: 'call',
    label: 'โทรศัพท์',
    lines: ['02-888-9900', '089-555-1122'],
  },
  {
    icon: 'mail',
    label: 'อีเมล',
    lines: ['contact@aaa-omega.co.th', 'support@aaa-omega.co.th'],
  },
  {
    icon: 'schedule',
    label: 'เวลาทำการ',
    lines: ['จันทร์ – ศุกร์: 08:00 – 17:00 น.', 'เสาร์: 08:00 – 12:00 น.', 'อาทิตย์: ปิดทำการ'],
  },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  serviceType: '',
  message: '',
};

const validateContact = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'กรุณาระบุชื่อ-นามสกุล';
  }

  if (!form.email.trim()) {
    errors.email = 'กรุณาระบุอีเมล';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
  }

  if (!form.phone.trim()) {
    errors.phone = 'กรุณาระบุเบอร์โทรศัพท์';
  } else if (!/^[0-9]{9,10}$/.test(form.phone.replace(/-/g, ''))) {
    errors.phone = 'เบอร์โทรศัพท์ไม่ถูกต้อง (9-10 หลัก)';
  }

  if (!form.message.trim()) {
    errors.message = 'กรุณาระบุรายละเอียดหรือคำถาม';
  } else if (form.message.trim().length < 10) {
    errors.message = 'กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร';
  }

  return errors;
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateContact(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <>
      <Header />
      <HeaderSectionAuth />

      <main className="font-kanit bg-neutral-lighter min-h-screen">

        {/* Banner */}
        <div className="relative w-full h-52 md:h-72 overflow-hidden">
          <img src={bannerImg} alt="ติดต่อเรา" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-darker/65 flex flex-col items-center justify-center text-center px-4">
<h1 className="text-3xl md:text-5xl font-bold text-white mb-2">ติดต่อเรา</h1>
            <p className="text-neutral-light text-sm md:text-base">
              พร้อมให้คำปรึกษาด้านพลังงานแสงอาทิตย์ ฟรี ไม่มีค่าใช้จ่าย
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Contact Info */}
            <aside className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-neutral-disable p-6">
                <h2 className="text-lg font-bold text-content-dark mb-5">ข้อมูลติดต่อ</h2>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <span className="material-symbols-outlined shrink-0 mt-0.5 text-primary-base">{info.icon}</span>
                      <div>
                        <p className="text-xs text-content-soft font-medium uppercase tracking-wide mb-1">
                          {info.label}
                        </p>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-sm text-content-dark leading-6">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social / LINE */}
              <div className="bg-white rounded-2xl border border-neutral-disable p-6">
                <h3 className="text-base font-bold text-content-dark mb-4">ช่องทางอื่น ๆ</h3>
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-[#06C755] hover:bg-[#05A847] text-white rounded-xl transition-all"
                >
                  <img src={lineIcon} alt="LINE" className="w-6 h-6 rounded-none" />
                  <span className="font-medium text-sm">@aaa-omega</span>
                </a>
              </div>

            </aside>

            {/* Contact Form */}
            <section className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-neutral-disable p-6 md:p-8">
                <h2 className="text-lg font-bold text-content-dark mb-1">ส่งข้อความถึงเรา</h2>
                <p className="text-sm text-content-soft mb-6">ทีมงานจะติดต่อกลับภายใน 1 วันทำการ</p>

                {submitted && (
                  <div className="mb-5 p-4 rounded-xl bg-success-lighter text-success-base text-sm">
                    ✅ ส่งข้อความสำเร็จ! ทีมงานจะติดต่อกลับโดยเร็ว ขอบคุณครับ/ค่ะ
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {/* ชื่อ */}
                  <div className="input-group">
                    <label htmlFor="name">
                      ชื่อ-นามสกุล <span className="text-error-base">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อ-นามสกุลของคุณ"
                      maxLength="100"
                      className={errors.name ? '!border-error-base' : ''}
                    />
                    {errors.name && <p className="text-xs text-error-base mt-1">{errors.name}</p>}
                  </div>

                  {/* อีเมล + โทรศัพท์ */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="input-group">
                      <label htmlFor="email">
                        อีเมล <span className="text-error-base">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={errors.email ? '!border-error-base' : ''}
                      />
                      {errors.email && <p className="text-xs text-error-base mt-1">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                      <label htmlFor="phone">
                        เบอร์โทรศัพท์ <span className="text-error-base">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="08X-XXX-XXXX"
                        maxLength="12"
                        className={errors.phone ? '!border-error-base' : ''}
                      />
                      {errors.phone && <p className="text-xs text-error-base mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* ประเภทบริการ */}
                  <div className="input-group">
                    <label htmlFor="serviceType">ประเภทบริการที่สนใจ</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={form.serviceType}
                      onChange={handleChange}
                    >
                      <option value="">เลือกประเภทบริการ (ถ้ามี)</option>
                      <option value="install">ติดตั้งระบบโซล่าเซลล์</option>
                      <option value="clean">ล้างและทำความสะอาดแผง</option>
                      <option value="maintenance">ซ่อมบำรุงและตรวจสอบระบบ</option>
                      <option value="consult">ขอคำปรึกษา</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>

                  {/* ข้อความ */}
                  <div className="input-group">
                    <label htmlFor="message">
                      รายละเอียด / คำถาม <span className="text-error-base">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="อธิบายความต้องการหรือคำถามของคุณ เช่น ขนาดพื้นที่ ค่าไฟเฉลี่ยต่อเดือน หรืออาการผิดปกติของระบบ"
                      maxLength="1000"
                      className={errors.message ? '!border-error-base' : ''}
                    ></textarea>
                    <div className="flex justify-between">
                      {errors.message
                        ? <p className="text-xs text-error-base">{errors.message}</p>
                        : <span />
                      }
                      <p className="text-xs text-content-soft text-right">{form.message.length}/1000</p>
                    </div>
                  </div>

                  <button type="submit" className="button w-full mt-1">
                    ส่งข้อความ
                  </button>
                </form>
              </div>
            </section>

          </div>
        </div>

      </main>

      <FooterSection />
    </>
  );
}
