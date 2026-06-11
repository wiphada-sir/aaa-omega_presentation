import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderSection';
import HeaderSectionAuth from '../components/HeaderSectionAuth';
import FooterSection from '../components/FooterSection';
import bannerImg from '../assets/images/banner-calculate.jpg';

const serviceTypes = [
  {
    id: 'install',
    icon: '⚡',
    title: 'ติดตั้งระบบโซล่าเซลล์',
    subtitle: 'Solar Installation',
    description: 'ออกแบบและติดตั้งระบบพลังงานแสงอาทิตย์ครบวงจร ทั้งระบบ On-Grid, Off-Grid และ Hybrid พร้อมทีมวิศวกรผู้เชี่ยวชาญ',
    features: [
      'ออกแบบระบบตามการใช้งานจริง',
      'ติดตั้งมาตรฐานสากล IEC',
      'ทดสอบระบบก่อนส่งมอบ',
      'รับประกันงานติดตั้ง 2 ปี',
    ],
    badge: 'บริการยอดนิยม',
    badgeColor: 'bg-warning-base text-white',
  },
  {
    id: 'clean',
    icon: '🧹',
    title: 'ล้างและทำความสะอาดแผง',
    subtitle: 'Panel Cleaning',
    description: 'ทำความสะอาดแผงโซล่าเซลล์อย่างถูกวิธี ด้วยน้ำยาเฉพาะทางที่ไม่ทำลายแผง ช่วยเพิ่มประสิทธิภาพการผลิตไฟได้สูงสุด 30%',
    features: [
      'ใช้น้ำยาเฉพาะทาง ไม่ทำลายแผง',
      'ตรวจสอบจุดยึดและสายไฟเบื้องต้น',
      'รายงานสภาพแผงหลังทำความสะอาด',
      'แนะนำรอบการทำความสะอาดที่เหมาะสม',
    ],
    badge: '',
    badgeColor: '',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'ซ่อมบำรุงและตรวจสอบระบบ',
    subtitle: 'Maintenance & Inspection',
    description: 'บริการซ่อมบำรุงและตรวจสอบระบบโดยทีมช่างผู้เชี่ยวชาญ ครอบคลุมทั้งอินเวอร์เตอร์ แบตเตอรี่ และระบบสายไฟ',
    features: [
      'ตรวจสอบค่าการผลิตไฟฟ้า',
      'วิเคราะห์ Error Code อินเวอร์เตอร์',
      'ตรวจแรงดันและสุขภาพแบตเตอรี่',
      'บริการฉุกเฉิน 24 ชั่วโมง',
    ],
    badge: '',
    badgeColor: '',
  },
];

const steps = [
  { step: '01', title: 'ติดต่อและแจ้งความต้องการ', desc: 'กรอกฟอร์มหรือโทรหาเรา ทีมงานตอบกลับภายใน 1 ชั่วโมงทำการ' },
  { step: '02', title: 'สำรวจหน้างานและเสนอราคา', desc: 'วิศวกรลงพื้นที่ประเมินและออกแบบระบบ พร้อมใบเสนอราคาโดยละเอียด' },
  { step: '03', title: 'ยืนยันและนัดหมาย', desc: 'ยืนยันโครงการและนัดวันเข้าทำงาน ทีมงานพร้อมดำเนินการ' },
  { step: '04', title: 'ติดตั้งและทดสอบระบบ', desc: 'ทีมช่างลงพื้นที่ ติดตั้งตามมาตรฐาน และทดสอบก่อนส่งมอบ' },
];

const stats = [
  { value: '500+', label: 'โครงการติดตั้ง' },
  { value: '15+', label: 'จังหวัดทั่วประเทศ' },
  { value: '25 ปี', label: 'ประกันแผงโซล่า' },
  { value: '24/7', label: 'บริการหลังการขาย' },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <Header />
      <HeaderSectionAuth />

      <main className="font-kanit bg-neutral-lighter min-h-screen">

        {/* Banner */}
        <div className="relative w-full h-64 md:h-88 overflow-hidden">
          <img src={bannerImg} alt="บริการ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-darker/60 flex flex-col items-center justify-center text-center px-4">
<h1 className="text-3xl md:text-5xl font-bold text-white mb-3">บริการของเรา</h1>
            <p className="text-neutral-light text-base md:text-lg max-w-xl">
              ครบครันทุกบริการด้านพลังงานแสงอาทิตย์ โดยทีมวิศวกรและช่างผู้เชี่ยวชาญ
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-primary-dark text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-base/40">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-5 px-4">
                  <p className="text-2xl md:text-3xl font-bold text-accent-base">{s.value}</p>
                  <p className="text-sm text-primary-light mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <section className="container mx-auto px-4 max-w-5xl py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-content-dark">บริการทั้งหมดของเรา</h2>
            <p className="text-content-soft mt-2">เลือกบริการที่ตรงกับความต้องการของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {serviceTypes.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border-2 p-6 flex flex-col gap-4 transition-all hover:shadow-lg ${
                  activeService === service.id
                    ? 'border-primary-base shadow-lg'
                    : 'border-neutral-disable hover:border-primary-soft'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{service.icon}</span>
                  {service.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-primary-base font-medium uppercase tracking-wider mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-content-dark">{service.title}</h3>
                  <p className="text-sm text-content-soft mt-2 leading-relaxed">{service.description}</p>
                </div>

                {activeService === service.id && (
                  <ul className="space-y-2 pt-2 border-t border-neutral-disable">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-content-base">
                        <span className="text-success-base mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  className="mt-auto text-sm text-primary-base hover:text-primary-hover font-medium text-left cursor-pointer"
                  onClick={() => setActiveService(prev => prev === service.id ? null : service.id)}
                >
                  {activeService === service.id ? 'ซ่อนรายละเอียด ▲' : 'ดูรายละเอียด ▼'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="bg-white py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-content-dark">ขั้นตอนการใช้บริการ</h2>
              <p className="text-content-soft mt-2">ง่าย รวดเร็ว และโปร่งใสทุกขั้นตอน</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.step} className="relative flex flex-col items-center text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-neutral-disable" />
                  )}
                  <div className="w-14 h-14 rounded-full bg-primary-lighter border-2 border-primary-base flex items-center justify-center text-primary-hover font-bold text-lg z-10">
                    {s.step}
                  </div>
                  <h4 className="font-bold text-content-dark mt-4 mb-1">{s.title}</h4>
                  <p className="text-sm text-content-soft leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-5xl py-14">
          <div className="bg-primary-dark rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">พร้อมเริ่มต้นแล้วใช่ไหม?</h2>
            <p className="text-primary-light mb-6 max-w-lg mx-auto">
              ติดต่อทีมงานของเราเพื่อรับคำปรึกษาฟรี และรับใบเสนอราคาภายใน 24 ชั่วโมง
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-accent-base hover:bg-accent-hover text-white rounded-xl font-bold transition-all"
              >
                ติดต่อเราเลย
              </Link>
              <Link
                to="/allproducts"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-bold transition-all"
              >
                ดูสินค้าทั้งหมด
              </Link>
            </div>
          </div>
        </section>

      </main>

      <FooterSection />
    </>
  );
}
