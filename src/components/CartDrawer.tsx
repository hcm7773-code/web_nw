import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onGoToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToMenu,
}) => {
  const [orderType, setOrderType] = useState<'takeout' | 'delivery'>('takeout');
  const [pickupTime, setPickupTime] = useState('30 分鐘後');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableware, setTableware] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const packagingFee = cart.length > 0 ? 30 : 0;
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 1500 ? 0 : 120) : 0;
  const grandTotal = subtotal + packagingFee + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!customerName || !customerPhone) {
      setFormError('請填寫訂購人姓名與聯絡電話');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress) {
      setFormError('請填寫外送地址');
      return;
    }
    const generatedId = `HS-ORDER-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#131110] border-l border-[#2e2926] shadow-2xl flex flex-col text-[#e5e0d8]"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#252220] flex items-center justify-between bg-[#171514]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c22b22]" />
              <h3 className="font-oriental font-bold text-lg text-[#f5f1ea]">
                外帶外送餐袋 ({cart.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8c8273] hover:text-white hover:bg-[#252220] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderConfirmed ? (
              /* ORDER CONFIRMATION VIEW */
              <div className="py-8 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#c22b22]/15 border border-[#c22b22] text-[#e13b2e] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#d49b55]">ORDER CONFIRMED</span>
                  <h4 className="font-oriental text-2xl font-bold text-[#f5f1ea] mt-1">
                    椒香盛宴已接單！
                  </h4>
                  <p className="text-xs text-[#9d9385] mt-1">
                    主廚已為您安排鮮魚現片與現潑熱油工序
                  </p>
                </div>

                <div className="p-4 bg-[#1a1715] rounded-lg border border-[#2b2623] text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#292523] pb-2">
                    <span className="text-[#8c8273]">訂單編號</span>
                    <span className="font-mono text-[#f5f1ea] font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#292523] pb-2">
                    <span className="text-[#8c8273]">取餐方式</span>
                    <span className="text-[#d49b55]">
                      {orderType === 'takeout' ? `到店自取 (${pickupTime})` : `專人溫控外送 (${deliveryAddress})`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#292523] pb-2">
                    <span className="text-[#8c8273]">訂購人</span>
                    <span className="text-[#f5f1ea]">{customerName} · {customerPhone}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#8c8273]">結帳金額</span>
                    <span className="font-mono text-[#e13b2e] font-bold text-sm">
                      NT$ {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#807669] leading-relaxed">
                  ※ 內附雙重保溫鎖鮮提袋與老茶油鍋底回溫說明卡。如需修改餐點請透過線上訂單系統或現場告知侍餐人員。
                </p>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-medium rounded transition-colors"
                >
                  完成並返回
                </button>
              </div>
            ) : isCheckingOut ? (
              /* CHECKOUT FORM VIEW */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#8c8273] pb-2 border-b border-[#262220]">
                  <span>請填寫取餐資訊</span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[#d49b55] hover:underline"
                  >
                    返回餐點明細
                  </button>
                </div>

                {formError && (
                  <div className="p-2.5 bg-[#c22b22]/15 border border-[#c22b22] text-[#f5f1ea] rounded text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e13b2e]" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Mode Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#191715] rounded-lg border border-[#2b2623]">
                  <button
                    type="button"
                    onClick={() => setOrderType('takeout')}
                    className={`py-2 text-xs font-medium rounded transition-colors ${
                      orderType === 'takeout'
                        ? 'bg-[#c22b22] text-white shadow'
                        : 'text-[#8c8273] hover:text-[#f5f1ea]'
                    }`}
                  >
                    到店自取 (台北西門旗艦店)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-medium rounded transition-colors ${
                      orderType === 'delivery'
                        ? 'bg-[#c22b22] text-white shadow'
                        : 'text-[#8c8273] hover:text-[#f5f1ea]'
                    }`}
                  >
                    專人外送 (滿1500免運)
                  </button>
                </div>

                {/* Pickup Time or Address */}
                {orderType === 'takeout' ? (
                  <div>
                    <label className="block text-xs text-[#aba193] mb-1">預計到店自取時間</label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                    >
                      <option value="30 分鐘後">約 30 分鐘後 (現場快製)</option>
                      <option value="45 分鐘後">約 45 分鐘後</option>
                      <option value="60 分鐘後">約 60 分鐘後 (推薦下班順取)</option>
                      <option value="晚間 18:30">今日 18:30</option>
                      <option value="晚間 19:30">今日 19:30</option>
                      <option value="晚間 21:00 (宵夜)">今日 21:00 (宵夜)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-[#aba193] mb-1">外送完整地址</label>
                    <input
                      type="text"
                      placeholder="請輸入外送詳細地址（包含門牌與樓層）"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                      required
                    />
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#aba193] mb-1">訂購人姓名</label>
                    <input
                      type="text"
                      placeholder="王大明 先生/小姐"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#aba193] mb-1">聯絡電話</label>
                    <input
                      type="tel"
                      placeholder="0912-345-678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Tableware Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="tableware"
                    checked={tableware}
                    onChange={(e) => setTableware(e.target.checked)}
                    className="accent-[#c22b22] rounded"
                  />
                  <label htmlFor="tableware" className="text-xs text-[#9d9385]">
                    需要華神原木環保筷與防燙隔熱紙碗
                  </label>
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-xs text-[#aba193] mb-1">結帳付款方式</label>
                  <div className="p-3 bg-[#191715] rounded border border-[#2b2623] text-xs text-[#aba193] flex items-center justify-between">
                    <span>取餐付款 / 信用卡 / LINE Pay</span>
                    <span className="text-[#d49b55] text-[11px]">取貨時感應結帳</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-[#c22b22] hover:bg-[#a9221a] text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>確認下單 · NT$ {grandTotal.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : cart.length === 0 ? (
              /* EMPTY CART VIEW */
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1e1b19] border border-[#2e2926] text-[#706659] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-oriental text-base text-[#d5cfc5]">您的點餐袋還是空的</p>
                  <p className="text-xs text-[#807669] mt-1">
                    挑選招牌漢源水煮魚、麻辣老火鍋或頂級肉品吧
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onGoToMenu();
                  }}
                  className="px-5 py-2 bg-[#262220] hover:bg-[#342e2a] text-[#d49b55] text-xs rounded transition-colors border border-[#d49b55]/30 inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>瀏覽珍饈菜單</span>
                </button>
              </div>
            ) : (
              /* ITEM LIST VIEW */
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8c8273] pb-1 border-b border-[#252220]">
                  <span>已選菜品 ({cart.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#9d9385] hover:text-[#e13b2e] transition-colors"
                  >
                    清空餐袋
                  </button>
                </div>

                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3 bg-[#191715] rounded-lg border border-[#262220] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-oriental text-sm font-semibold text-[#f5f1ea] truncate">
                        {cartItem.item.name}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#8c8273] mt-0.5">
                        <span>{cartItem.spiciness}</span>
                        <span aria-hidden="true">·</span>
                        <span>{cartItem.numbing}</span>
                      </div>
                      <div className="font-mono text-xs text-[#d49b55] font-semibold mt-1">
                        NT$ {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-[#38322e] rounded bg-[#121110]">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="p-1 hover:text-[#c22b22] text-[#8c8273] transition-colors"
                          aria-label="減少"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium text-[#f5f1ea]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="p-1 hover:text-[#c22b22] text-[#8c8273] transition-colors"
                          aria-label="增加"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="p-1 text-[#665d52] hover:text-[#c22b22] transition-colors"
                        aria-label="刪除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer (Price Breakdown and Checkout Button) */}
          {cart.length > 0 && !orderConfirmed && !isCheckingOut && (
            <div className="p-5 border-t border-[#252220] bg-[#161413] space-y-3">
              <div className="space-y-1.5 text-xs text-[#9d9385]">
                <div className="flex justify-between">
                  <span>菜品小計</span>
                  <span className="font-mono text-[#f5f1ea]">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>雙重保溫鎖鮮包裝費</span>
                  <span className="font-mono text-[#f5f1ea]">NT$ {packagingFee}</span>
                </div>
                <div className="flex justify-between text-[#807669] text-[11px]">
                  <span>運費 (外帶自取免運 / 外送滿1500免運)</span>
                  <span className="font-mono">
                    {orderType === 'takeout' ? '免運' : deliveryFee === 0 ? '免運優惠' : `NT$ ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#292523] text-sm font-semibold text-[#f5f1ea]">
                  <span className="font-oriental">應付總額</span>
                  <span className="font-mono text-base text-[#e13b2e]">
                    NT$ {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>填寫取餐資訊與結帳</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
