// ShippingOption.jsx

// แสดงตัวเลือกวิธีจัดส่งเป็น card/radio
// รับ props ของแต่ละวิธี, selected state, callback เมื่อเลือก
const ShippingOption = ({ id, title, description, days, selected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`p-4 border rounded-lg cursor-pointer mb-3 transition-all flex items-center justify-between ${
        selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-blue-600' : 'border-gray-300'
        }`}>
          {selected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
        </div>
        <div>
          <h3 className={`font-bold ${selected ? 'text-blue-800' : 'text-gray-800'}`}>{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
        {days} วัน
      </div>
    </div>
  );
};

export default ShippingOption;