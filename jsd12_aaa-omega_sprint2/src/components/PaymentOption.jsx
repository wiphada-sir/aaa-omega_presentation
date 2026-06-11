const PaymentOption = ({ id, title, icon, selected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`p-4 border rounded-lg cursor-pointer mb-3 transition-all flex items-center gap-4 ${
        selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? 'border-blue-600' : 'border-gray-300'
      }`}>
        {selected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
      </div>
      <div className="text-2xl">{icon}</div>
      <h3 className={`font-bold ${selected ? 'text-blue-800' : 'text-gray-800'}`}>{title}</h3>
    </div>
  );
};

export default PaymentOption;