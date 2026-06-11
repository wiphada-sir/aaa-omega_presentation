import { FormatPrice } from '../utils/FormatPrice';

export default function OrderSummary({ items, onCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 200 : 0;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-2xl border border-neutral-disable p-6 sticky top-4">
      <h2 className="text-lg font-bold text-content-dark mb-4">สรุปคำสั่งซื้อ</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-content-base">
          <span>สินค้า ({itemCount} ชิ้น)</span>
          <span>{FormatPrice(subtotal)} บาท</span>
        </div>
        <div className="flex justify-between text-content-base">
          <span>ค่าจัดส่ง</span>
          <span className={shipping === 0 && subtotal > 0 ? 'text-success-base font-medium' : ''}>
            {subtotal === 0 ? '-' : shipping === 0 ? 'ฟรี' : `${FormatPrice(shipping)} บาท`}
          </span>
        </div>
        {subtotal > 0 && shipping > 0 && (
          <p className="text-xs text-content-soft">
            สั่งซื้อครบ {FormatPrice(5000)} บาท รับส่งฟรี
          </p>
        )}
        <hr className="my-3 border-neutral-disable" />
        <div className="flex justify-between text-base font-bold text-content-dark">
          <span>ยอดรวมทั้งหมด</span>
          <span className="text-primary-base">{FormatPrice(total)} บาท</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="button w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ดำเนินการสั่งซื้อ
      </button>
    </div>
  );
}
