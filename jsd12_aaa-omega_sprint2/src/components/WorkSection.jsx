
const WorkSection = () => {
  const works = [
    { id: 1, location: "กรุงเทพฯ", detail: "โรงงานในเขตลาดกระบัง", capacity: "100kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/bkk200kw_js5szn.jpg` },
    { id: 2, location: "สมุทรปราการ", detail: "บ้านพักอาศัยใน อ.บางพลี", capacity: "30kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477597/spk30kw_mo7bgg.jpg` },
    { id: 3, location: "นนทบุรี", detail: "อาคารสำนักงานใน อ.บางบัวทอง", capacity: "15kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/bbt15kw_u10nph.jpg` },
    { id: 4, location: "ปทุมธานี", detail: "โชว์รูมรถยนต์", capacity: "50kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477597/ptn50kw_bae5nc.jpg` },
    { id: 5, location: "ชลบุรี", detail: "โรงงานอุตสาหกรรมใน อ.ศรีราชา", capacity: "180kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/cbr180kw_besnvw.jpg` },
    { id: 6, location: "นครราชสีมา (เขาใหญ่)", detail: "รีสอร์ทและบ้านพักตากอากาศ", capacity: "55kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/khaoyai55kw_nzepyh.jpg` },
    { id: 7, location: "เชียงใหม่", detail: "โฮมสเตย์เชิงอนุรักษ์", capacity: "10kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/cnx10kw_joc6jk.jpg` },
    { id: 8, location: "สระบุรี", detail: "ฟาร์มเกษตรอัจฉริยะ", capacity: "20kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477597/sbr20kw_gxkio7.jpg` },
    { id: 9, location: "ภูเก็ต", detail: "วิลล่าตากอากาศริมทะเล", capacity: "65kW", img: `https://res.cloudinary.com/dlctlfnwu/image/upload/v1780477596/phuket65kw_v870ke.jpg` },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 font-kanit">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">ผลงานการติดตั้ง AAA Omega</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map(work => (
          <div 
            key={work.id} 
            className="relative rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <img 
              src={work.img} 
              alt={work.location} 
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
              
              {/* ป้าย kW ที่เล็กลง */}
              <div className="absolute top-4 right-4">
                <span className="bg-amber-500 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md">
                  ⚡ {work.capacity}
                </span>
              </div>
              
              {/* ชื่อสถานที่และรายละเอียด */}
              <div className="space-y-4">
                <p className="font-bold text-4xl text-white tracking-wide">
                  {work.location}
                </p>
                <p className="text-gray-100 text-xl font-light">
                  {work.detail}
                </p>
              </div>

            </div>

            {/* ส่วนด้านล่าง ปรับฟอนต์ชื่อจังหวัดให้ใหญ่ขึ้นเป็น text-lg */}
            <div className="p-4 bg-white border-t border-gray-50 group-hover:bg-gray-50 transition-colors">
              <p className="font-semibold text-lg text-gray-800 text-left">{work.location}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;