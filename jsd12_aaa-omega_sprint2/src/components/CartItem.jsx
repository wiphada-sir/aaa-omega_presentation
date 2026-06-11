import { FormatPrice } from '../utils/FormatPrice';
import { ImageNotFound } from './common/NotFound';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { productNumber, name, sku, price, image, quantity } = item;

  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-disable">
      <img
        src={image?.trim() || ImageNotFound}
        alt={name}
        className="w-20 h-20 min-w-20 object-cover rounded-xl border border-neutral-disable"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-content-dark line-clamp-2">{name}</p>
        <p className="text-sm text-content-soft">SKU: {sku}</p>
        <p className="text-primary-base font-bold mt-1">{FormatPrice(price)} บาท</p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onRemove(productNumber)}
          className="text-xs text-error-base hover:text-error-hover transition-colors"
        >
          ลบ
        </button>
        <div className="flex items-center border border-neutral-disable rounded-lg overflow-hidden">
          <button
            onClick={() => quantity > 1 && onQuantityChange(productNumber, quantity - 1)}
            className="px-3 py-1.5 hover:bg-neutral-light text-content-base select-none"
          >
            −
          </button>
          <span className="px-3 py-1.5 text-sm font-medium text-content-dark min-w-8 text-center border-x border-neutral-disable">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(productNumber, quantity + 1)}
            className="px-3 py-1.5 hover:bg-neutral-light text-content-base select-none"
          >
            +
          </button>
        </div>
        <p className="text-sm text-content-soft">
          รวม:{' '}
          <span className="text-content-dark font-semibold">
            {FormatPrice(price * quantity)} บาท
          </span>
        </p>
      </div>
    </div>
  );
}
