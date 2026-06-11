import { useState } from 'react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { q: "1. ติดตั้งโซลาร์เซลล์ประหยัดจริงไหม?", a: "ประหยัดได้จริง 20-50% ต่อเดือน ขึ้นอยู่กับขนาดระบบและปริมาณการใช้ไฟฟ้าครับ" },
    { q: "2. แผงโซลาร์เซลล์มีอายุการใช้งานกี่ปี?", a: "แผงโซลาร์มีอายุการใช้งานยาวนานถึง 25 ปีขึ้นไปครับ" },
    { q: "3. ฝนตกหรือฟ้าครึ้ม ไฟจะผลิตได้ไหม?", a: "ผลิตได้ครับ แต่กำลังการผลิตจะลดลงตามความเข้มของแสงแดด" },
    { q: "4. ต้องล้างแผงบ่อยแค่ไหน?", a: "แนะนำให้ทำความสะอาดทุก 6 เดือน เพื่อประสิทธิภาพสูงสุดครับ" },
    { q: "5. ใช้ไฟตอนกลางคืนได้ไหม?", a: "ระบบปกติจะใช้ไฟการไฟฟ้าตอนกลางคืน ยกเว้นติดตั้งระบบ Hybrid พร้อมแบตเตอรี่ครับ" },
    { q: "6. ติดตั้งใช้เวลากี่วัน?", a: "บ้านพักอาศัยทั่วไปใช้เวลาติดตั้งประมาณ 1-2 วันครับ" },
    { q: "7. ต้องขออนุญาตติดตั้งไหม?", a: "ต้องแจ้งการไฟฟ้าครับ เรามีบริการดำเนินการเรื่องเอกสารให้ทั้งหมด" },
    { q: "8. หลังคาแบบไหนติดตั้งได้บ้าง?", a: "ได้เกือบทุกประเภทครับ วิศวกรจะประเมินโครงสร้างก่อนติดตั้ง" },
    { q: "9. มีการรับประกันอย่างไร?", a: "ประกันแผง 25 ปี, Inverter 5-10 ปี และประกันงานติดตั้ง 2 ปีครับ" },
    { q: "10. ระบบปลอดภัยจากไฟรั่วไหม?", a: "มีระบบตัดไฟอัตโนมัติและมาตรฐานความปลอดภัยสากลครับ" },
    { q: "11. ค่าบำรุงรักษาสูงไหม?", a: "แทบไม่มีค่าใช้จ่ายรายเดือนครับ มีเพียงค่าล้างแผงตามรอบเท่านั้น" },
    { q: "12. ไฟดับ ระบบทำงานไหม?", a: "ระบบปกติจะดับตามการไฟฟ้าเพื่อความปลอดภัยครับ" },
    { q: "13. ทำไมเลือกติดตั้งกับเรา?", a: "เรามีทีมวิศวกรเฉพาะทาง อุปกรณ์มาตรฐานโลกและบริการครบวงจรครับ" },
    { q: "14. ขายไฟคืนได้ไหม?", a: "เข้าร่วมโครงการโซลาร์ภาคประชาชนได้ เราช่วยยื่นเรื่องให้ครับ" },
    { q: "15. แผงหนักจะทำให้หลังคาพังไหม?", a: "วิศวกรจะคำนวณการรับน้ำหนักของโครงสร้างก่อนเสมอครับ" },
    { q: "16. ทำไมราคาแต่ละเจ้าต่างกัน?", a: "ขึ้นอยู่กับคุณภาพแผง มาตรฐานการติดตั้ง และบริการหลังการขายครับ" },
    { q: "17. หลังคาบ้านจะร้อนขึ้นไหม?", a: "ไม่ครับ แผงช่วยบังแดด ช่วยลดอุณหภูมิใต้หลังคาได้ด้วยครับ" },
    { q: "18. มีแอปให้ดูการผลิตไฟไหม?", a: "มีครับ ดูข้อมูลการผลิต Real-time ผ่านมือถือได้เลย" },
    { q: "19. ถ้าจะซ่อมหลังคา ทำอย่างไร?", a: "แจ้งเราได้ครับ เรามีบริการถอดและติดตั้งแผงใหม่ให้ครับ" },
    { q: "20. เริ่มต้นติดตั้งต้องทำอย่างไร?", a: "ส่งบิลค่าไฟล่าสุดให้เรา เพื่อให้วิศวกรประเมินความคุ้มค่าครับ" }
  ];

  const renderFaqCard = (item, index) => (
    <div 
      key={index} 
      className="border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 mb-4"
    >
      <button
        onClick={() => toggleFaq(index)}
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`font-semibold ${openIndex === index ? 'text-blue-900' : 'text-gray-700'}`}>
          {item.q}
        </span>
        <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 bg-gray-50 text-gray-600 border-t border-gray-100 leading-relaxed">
          {item.a}
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-2 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">คำถามที่พบบ่อย (FAQ)</h2>
        <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 items-start">
        <div className="flex flex-col">
          {faqData.filter((_, i) => i % 2 === 0).map((item) =>
            renderFaqCard(item, faqData.indexOf(item))
          )}
        </div>

        <div className="flex flex-col">
          {faqData.filter((_, i) => i % 2 !== 0).map((item) =>
            renderFaqCard(item, faqData.indexOf(item))
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;