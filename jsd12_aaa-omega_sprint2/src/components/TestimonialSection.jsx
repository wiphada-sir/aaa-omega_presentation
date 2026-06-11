import { useEffect, useRef } from 'react';

const TestimonialSection = () => {
  const trackRef = useRef(null);

  const testimonials = [
    { id: 101, name: "กัญญารัตน์ อัครเดโช", role: "Marketing Manager, TechSolutions", comment: "ติดตั้งระบบโซลาร์เซลล์แล้วค่าไฟลดลงเห็นผลตั้งแต่วันแรก ทีมงานมืออาชีพมากค่ะ ให้คำแนะนำดีมาก" },
    { id: 102, name: "ณัฐพงษ์ วัฒนกุล", role: "Project Lead, Green Energy Co.,Ltd", comment: "งานเนี๊ยบมากครับ เก็บสายไฟเรียบร้อย ติดตั้งไว ระบบเสถียรสุดๆ คุ้มค่าที่เลือกลงทุนครับ" },
    { id: 103, name: "ธนพร อรุณสวัสดิ์", role: "Business Owner, Home Decor", comment: "บริการครบวงจรดีจริงๆ ค่ะ ไม่ต้องวุ่นวายหาของเองเลย ประทับใจการดูแลหลังการขายมากค่ะ" },
    { id: 104, name: "ภาณุพงศ์ เจริญกิจ", role: "Software Engineer, FinTech Startups", comment: "ชอบที่ทีมงานมี Dashboard ให้ดูผ่าน App ใช้งานง่ายและดูข้อมูล Real-time ได้ดีเยี่ยมครับ" },
    { id: 105, name: "เมธาวี สุขสมบูรณ์", role: "Interior Designer, Creative Studio", comment: "ติดตั้งสวยงาม เข้ากับดีไซน์บ้านได้ดีมากค่ะ ทีมงานเก็บรายละเอียดงานได้เนี๊ยบที่สุด" },
    { id: 106, name: "อภิชัย ศรีรัตน", role: "Manager, Logistics Express", comment: "เป็นบริษัทที่ไว้ใจได้จริงๆ ติดตั้งเสร็จตามกำหนดการ การบริการหลังการขายทำได้ยอดเยี่ยมมากครับ" },
    { id: 107, name: "รินรดา วิวัฒน์", role: "Consultant, HR Solutions", comment: "คุ้มค่าการลงทุนครับ เห็นผลทันทีตั้งแต่เดือนแรกที่ติด แนะนำเพื่อนมาติดด้วยกันหลายบ้านแล้วค่ะ" }
  ];

  useEffect(() => {
    const track = trackRef.current;
    const gap = 24; // gap-6
    const slideInterval = 4000;

    const slideNext = () => {
      if (!track || track.children.length === 0) return;

      const firstCard = track.firstElementChild;
      const slideWidth = firstCard.offsetWidth + gap;

      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        track.appendChild(firstCard);
      }, 500);
    };

    const intervalId = setInterval(slideNext, slideInterval);
    return () => clearInterval(intervalId); // ล้างค่าเมื่อปิดหน้าจอเพื่อไม่ให้เว็บอืด
  }, []);

  return (
    <section className="py-8 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">ความประทับใจจากลูกค้า</h2>
        <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full opacity-20"></div>
      </div>

      <div className="testimonial-wrapper w-full mx-auto px-6 md:px-10 lg:px-20 mb-12 overflow-hidden">
        <div 
          ref={trackRef}
          className="testimonial-container flex gap-6 transition-transform duration-500 ease-in-out"
        >
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="testimonial-card shrink-0 w-75 md:w-87.5 p-6 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <img 
                  src={`https://i.pravatar.cc/150?u=${item.id}`} 
                  alt="customer" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100" 
                />
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">"{item.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;