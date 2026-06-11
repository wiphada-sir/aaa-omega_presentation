
const FilterSection = ({ title, items, selectedItems, onChange }) => (
  <div className="mb-8">
    <h3 className="font-bold text-content-hover mb-4 flex items-center gap-2 text-lg">
      <span className="w-1.5 h-5 bg-accent-hover rounded-full"></span>
      {title}
    </h3>
    <div className="space-y-3">
      {items.map((item) => (
        <label key={item} className="flex items-center group cursor-pointer">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-primary-soft transition-all"
              checked={selectedItems.includes(item)}
              onChange={() => onChange(item)}
            />
            <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-sm left-0.5">
              check
            </span>
          </div>
          <span className="ml-3 text-content-hover group-hover:text-primary-soft transition-colors">
            {item}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSection;