import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Flame,
  Award,
  ChevronDown,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { AppPage, BlockId, ReservationState, MenuItem } from '../types';
import { SET_MENUS } from '../data/menuData';

interface ExperiencePageProps {
  reservationState: ReservationState;
  onUpdateReservation: (updates: Partial<ReservationState>) => void;
  onConfirmReservation: () => void;
  onOpenCart: () => void;
  onNavigatePage: (page: AppPage, targetBlock?: BlockId) => void;
  onAddToCart?: (item: MenuItem, spiciness: string, numbing: string) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  reservationState,
  onUpdateReservation,
  onConfirmReservation,
  onOpenCart,
  onNavigatePage,
  onAddToCart,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isVipRegistered, setIsVipRegistered] = useState(false);

  const seatingTypes = [
    {
      id: 'hall',
      title: '「凝香雅緻」獨立雅座',
      suitable: '1 - 4 人 · 冷麻凝香氛圍',
      desc: '靜謐空間，感受冷麻的火鍋凝香，桌距1.8米舒適寬敞，適合朋友小聚、日常打卡。',
    },
    {
      id: 'window',
      title: '「椒蘭香榭」臨窗景觀雅座',
      suitable: '4 - 6 人 · 台北西門鬧區靜巷繁華璀璨夜景',
      desc: '靜謐璀璨夜色，高背沙發半包廂隔屏，適合情侶約會與家庭團聚。',
    },
    {
      id: 'vip',
      title: '「丹霞九霄」獨立貴賓包廂',
      suitable: '6 - 14 人 · 專屬侍餐茶席',
      desc: '極致隱密，獨立專屬管家、私人茶席，可指定雙鍋底，免開瓶費。',
    },
  ];

  const faqs = [
    {
      q: '現場有提供不辣的鍋底嗎？不吃牛油可以吃水煮魚嗎？',
      a: '有的！我們備有野生蕈菇熬製之「滋補野蕈古法酸菜魚金湯鍋」，亦可點選清香清甜之「山泉鱸魚藤椒水煮（可調為免辣清蒸藤椒風味）」。火鍋亦備有純茶油熬煮的無牛油高湯。',
    },
    {
      q: '線上訂位需要支付訂金嗎？包廂有低消限制嗎？',
      a: '獨立雅座與臨窗景觀席免付訂金；「丹霞九霄獨立包廂」平日晚間低消為 NT$ 12,000，假日為 NT$ 16,000，線上送出後將由專屬侍餐經理於24小時內致電確認菜單與訂金。',
    },
    {
      q: '外帶點餐水煮魚會影響口感嗎？如何回溫加熱？',
      a: '不會！華神外帶採用專利「雙重鋁箔恆溫密封提袋」，60分鐘內保持在70°C以上。包裝內附主廚復熱指南：微波或小火慢煨至邊緣冒泡即可關火，魚肉依舊滑嫩多汁。',
    },
    {
      q: '門市有配合停車優惠與代客泊車服務嗎？',
      a: '台北西門旗艦店與概念西門店鄰近峨眉立體停車場與洛陽立體停車場（步行約3分鐘），持當日用餐發票可至櫃台洽詢特約停車折抵禮遇。',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    if (!reservationState.name || !reservationState.phone) {
      setBookingError('請填寫預約人姓名與聯絡電話');
      return;
    }
    onConfirmReservation();
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Experience Hero Header */}
      <section className="pt-10 pb-2 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <span className="text-xs font-latin-display text-[#d49b55] tracking-widest uppercase">
          RESERVATIONS & HOSPITALITY CONCIERGE
        </span>
        <h1 className="font-oriental text-4xl sm:text-5xl font-bold text-[#f5f1ea] tracking-wider">
          預約與鑑賞 · 席位與外帶整合
        </h1>
        <p className="text-xs sm:text-sm text-[#9d9385] max-w-xl mx-auto leading-relaxed">
          線上即刻尊榮留席，提前指定沸騰水煮魚與麻辣老火鍋；或選擇專人外帶外送，將華神·椒麻 極致饗宴帶回家中。
        </p>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 1: 尊榮線上訂位系統 (Interactive Table Reservation) */}
      {/* ============================================================ */}
      <section id="exp-booking" className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#141211] border border-[#2d2825] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#252220] gap-2">
            <div>
              <span className="text-xs font-mono text-[#d49b55]">SECTION 01 · TABLE RESERVATIONS</span>
              <h2 className="font-oriental text-2xl sm:text-3xl font-bold text-[#f5f1ea] mt-1">
                線上席位即時預約
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8c8273]">
              <Clock className="w-4 h-4 text-[#c22b22]" />
              <span>實時確認 · 預留鮮魚不等待</span>
            </div>
          </div>

          {reservationState.confirmed ? (
            /* RESERVATION CONFIRMATION SUCCESS PASS */
            <div className="py-6 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#c22b22]/15 border border-[#c22b22] text-[#e13b2e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#d49b55]">CONFIRMATION PASS</span>
                <h3 className="font-oriental text-3xl font-bold text-[#f5f1ea] mt-1">
                  預約已成立 · 恭候大駕
                </h3>
                <p className="text-xs text-[#9d9385] mt-1">
                  確認簡訊與行事曆邀請已發送至您的手機
                </p>
              </div>

              {/* VIP Reservation Card */}
              <div className="max-w-lg mx-auto p-6 rounded-xl bg-gradient-to-b from-[#1c1917] to-[#121110] border border-[#d49b55]/40 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#2d2825] pb-3">
                  <span className="font-oriental text-sm font-bold text-[#f5f1ea]">
                    華神·椒麻 極致饗宴 席位尊榮憑證
                  </span>
                  <span className="font-mono text-xs font-bold text-[#d49b55]">
                    {reservationState.bookingCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#807669] block">用餐日期與時段</span>
                    <span className="text-[#f5f1ea] font-medium mt-0.5 block">
                      {reservationState.date} · {reservationState.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#807669] block">用餐人數</span>
                    <span className="text-[#f5f1ea] font-medium mt-0.5 block">
                      {reservationState.guests} 位賓客
                    </span>
                  </div>
                  <div>
                    <span className="text-[#807669] block">預訂席位空間</span>
                    <span className="text-[#d49b55] font-medium mt-0.5 block">
                      {seatingTypes.find((s) => s.id === reservationState.seatingType)?.title}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#807669] block">預約姓名</span>
                    <span className="text-[#f5f1ea] font-medium mt-0.5 block">
                      {reservationState.name} 貴賓
                    </span>
                  </div>
                </div>

                {reservationState.preSelectedPot && (
                  <div className="p-3 bg-[#161413] rounded border border-[#292523] text-xs">
                    <span className="text-[#807669] block">提前預留菜品</span>
                    <span className="text-[#e13b2e] font-oriental font-semibold mt-0.5 block">
                      {reservationState.preSelectedPot}（主廚將於入座前現片現潑）
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onUpdateReservation({ confirmed: false })}
                  className="px-5 py-2.5 bg-[#252220] hover:bg-[#342e2a] text-xs font-medium text-[#d49b55] rounded transition-colors"
                >
                  修改預約資訊
                </button>
                <button
                  onClick={() => onNavigatePage('menu', 'menu-broths')}
                  className="px-5 py-2.5 bg-[#c22b22] hover:bg-[#a9221a] text-xs font-semibold text-white rounded transition-colors"
                >
                  返回查看菜單
                </button>
              </div>
            </div>
          ) : (
            /* RESERVATION FORM */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {bookingError && (
                <div className="p-3 bg-[#c22b22]/15 border border-[#c22b22] text-[#f5f1ea] rounded text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e13b2e]" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Step 1: Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#aba193] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d49b55]" />
                    <span>預約用餐日期</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={reservationState.date}
                    onChange={(e) => onUpdateReservation({ date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#aba193] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#d49b55]" />
                    <span>用餐時段</span>
                  </label>
                  <select
                    value={reservationState.timeSlot}
                    onChange={(e) => onUpdateReservation({ timeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                  >
                    <optgroup label="午間雅宴 (11:30 - 15:00)">
                      <option value="11:30">11:30 開席</option>
                      <option value="12:00">12:00 開席</option>
                      <option value="12:30">12:30 開席</option>
                      <option value="13:30">13:30 開席</option>
                    </optgroup>
                    <optgroup label="晚間盛宴 (17:30 - 22:30)">
                      <option value="17:30">17:30 開席</option>
                      <option value="18:30">18:30 開席 (熱門)</option>
                      <option value="19:30">19:30 開席 (熱門)</option>
                      <option value="20:30">20:30 開席</option>
                    </optgroup>
                    <optgroup label="深夜宵夜 (22:30 - 02:00)">
                      <option value="22:30">22:30 深夜初席</option>
                      <option value="23:30">23:30 宵夜酣暢</option>
                      <option value="00:30">00:30 宵夜次席</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#aba193] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d49b55]" />
                    <span>用餐人數</span>
                  </label>
                  <select
                    value={reservationState.guests}
                    onChange={(e) => onUpdateReservation({ guests: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2.5 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14].map((num) => (
                      <option key={num} value={num}>
                        {num} 位賓客 {num >= 6 ? '（推薦預約包廂）' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Seating Area */}
              <div>
                <label className="block text-xs text-[#aba193] mb-2">
                  選擇偏好空間席位
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {seatingTypes.map((seat) => {
                    const isSelected = reservationState.seatingType === seat.id;
                    return (
                      <div
                        key={seat.id}
                        onClick={() => onUpdateReservation({ seatingType: seat.id as any })}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#221c19] border-[#c22b22] shadow-sm'
                            : 'bg-[#181614] border-[#292523] hover:border-[#3d3632]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-oriental text-sm font-semibold ${
                              isSelected ? 'text-[#f5f1ea]' : 'text-[#aba193]'
                            }`}
                          >
                            {seat.title}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#c22b22]" />}
                        </div>
                        <div className="text-[11px] text-[#d49b55] mt-1">{seat.suitable}</div>
                        <p className="text-[11px] text-[#807669] mt-1 leading-relaxed">
                          {seat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Broth Pre-selection & Spice Tolerance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#aba193] mb-1.5 flex items-center justify-between">
                    <span>提前預留鎮店招牌鍋物（可略過現場再點）</span>
                    <button
                      type="button"
                      onClick={() => onNavigatePage('menu', 'menu-broths')}
                      className="text-[#d49b55] hover:underline text-[11px]"
                    >
                      查看菜單圖片
                    </button>
                  </label>
                  <select
                    value={reservationState.preSelectedPot}
                    onChange={(e) => onUpdateReservation({ preSelectedPot: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                  >
                    <option value="">到店現場點餐</option>
                    <option value="漢源貢椒沸騰現片黑魚 (NT$ 1,880)">
                      漢源貢椒沸騰現片黑魚（鮮活現片 · NT$ 1,880）
                    </option>
                    <option value="山泉鱸魚藤椒青花椒水煮 (NT$ 1,380)">
                      山泉鱸魚藤椒青花椒水煮（清亮鮮麻 · NT$ 1,380）
                    </option>
                    <option value="重慶百年古法牛油麻辣鍋 (NT$ 1,280)">
                      重慶百年古法牛油麻辣鍋（百年秘方 · NT$ 1,280）
                    </option>
                    <option value="滋補野蕈古法酸菜魚金湯鍋 (NT$ 980)">
                      滋補野蕈古法酸菜魚金湯鍋（溫補鮮甜 · NT$ 980）
                    </option>
                    <option value="雙人椒香沸騰經典饗宴 (NT$ 2,380)">
                      雙人椒香沸騰經典饗宴（套餐 · NT$ 2,380）
                    </option>
                    <option value="四人經典鼎沸尊榮盛宴 (NT$ 4,680)">
                      四人經典鼎沸尊榮盛宴（套餐 · NT$ 4,680）
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#aba193] mb-1.5 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#c22b22]" />
                    <span>辣度與麻度偏好預設</span>
                  </label>
                  <select
                    value={reservationState.spiceTolerance}
                    onChange={(e) => onUpdateReservation({ spiceTolerance: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                  >
                    <option value="椒香微辣">微辣微麻（香醇清爽，初嘗首選）</option>
                    <option value="正宗巴蜀">正宗巴蜀標準辣麻（主廚推薦黃金比例）</option>
                    <option value="重辣重麻">重辣重麻（嗜辣饕客，熱油爆香）</option>
                    <option value="完全免辣（清湯或酸菜湯）">完全免辣（野蕈古法酸菜魚金湯）</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#252220]">
                <div>
                  <label className="block text-xs text-[#aba193] mb-1">貴賓姓名</label>
                  <input
                    type="text"
                    placeholder="陳先生 / 林小姐"
                    value={reservationState.name}
                    onChange={(e) => onUpdateReservation({ name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#aba193] mb-1">行動電話</label>
                  <input
                    type="tel"
                    placeholder="0912-345-678"
                    value={reservationState.phone}
                    onChange={(e) => onUpdateReservation({ phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#aba193] mb-1">電子信箱（寄送通知）</label>
                  <input
                    type="email"
                    placeholder="guest@example.com"
                    value={reservationState.email}
                    onChange={(e) => onUpdateReservation({ email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#aba193] mb-1">
                  特別需求備註（紀念日慶祝 / 生日贈禮 / 忌口食材）
                </label>
                <input
                  type="text"
                  placeholder="例：當日慶祝結婚紀念日，需要景觀安靜席位；同桌一位不食牛肉"
                  value={reservationState.specialRequests}
                  onChange={(e) => onUpdateReservation({ specialRequests: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1b1816] border border-[#352f2b] rounded text-xs text-[#f5f1ea] focus:border-[#c22b22] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>送出尊榮席位預約</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 2: 椒香盛宴外帶外送點餐整合 (Integrated Takeout & Delivery) */}
      {/* ============================================================ */}
      <section id="exp-takeout" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2d2825]">
          <div>
            <span className="text-xs font-mono text-[#d49b55]">SECTION 02 · TAKEOUT & HOME BANQUET</span>
            <h2 className="font-oriental text-3xl font-bold text-[#f5f1ea] mt-1">
              椒香盛宴 · 外帶外送整合服務
            </h2>
            <p className="text-xs text-[#9d9385] mt-1">
              活魚現片、高溫熱油現潑封裝；專利鋁箔保溫提袋 60 分鐘恆溫送達
            </p>
          </div>
          <button
            onClick={onOpenCart}
            className="px-4 py-2 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded transition-colors flex items-center gap-2 shrink-0 shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>開啟外帶餐袋進行結帳</span>
          </button>
        </div>

        {/* 3 Step Takeout Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-[#141211] border border-[#282422] space-y-2">
            <span className="text-xs font-mono text-[#c22b22]">STEP 01</span>
            <h4 className="font-oriental text-lg font-bold text-[#f5f1ea]">
              接單現撈 · 220°C 熱油現潑
            </h4>
            <p className="text-xs text-[#9d9385] leading-relaxed">
              絕無預製調理包！每份水煮魚皆於您預定取餐時間前15分鐘現片入鍋，熱油現潑後封口，保持現煮最佳脆嫩狀態。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#141211] border border-[#282422] space-y-2">
            <span className="text-xs font-mono text-[#d49b55]">STEP 02</span>
            <h4 className="font-oriental text-lg font-bold text-[#f5f1ea]">
              專利雙重保溫 · 恆溫 70°C 鎖鮮
            </h4>
            <p className="text-xs text-[#9d9385] leading-relaxed">
              沉香厚磅牛皮紙與食品級熱反射鋁箔內裡，即使外送路程40分鐘，開袋依然香氣撲鼻、熱氣蒸騰。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#141211] border border-[#282422] space-y-2">
            <span className="text-xs font-mono text-[#d49b55]">STEP 03</span>
            <h4 className="font-oriental text-lg font-bold text-[#f5f1ea]">
              隨袋附贈 · 主廚復熱風味手冊
            </h4>
            <p className="text-xs text-[#9d9385] leading-relaxed">
              隨餐附贈特製蒜泥香油碟與復熱說明，微波或鍋煮皆能100%還原店內老火鍋與水煮魚之精純神韻。
            </p>
          </div>
        </div>

        {/* Package Sets Ready for Quick Cart Addition */}
        <div className="p-6 rounded-xl bg-[#171514] border border-[#2e2926] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-oriental text-lg font-bold text-[#f5f1ea]">
              外帶熱銷套餐推薦（免運直送）
            </h3>
            <span className="text-xs text-[#d49b55]">滿 $1,500 即享專人溫控免費外送</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SET_MENUS.map((set) => (
              <div
                key={set.id}
                className="p-4 rounded-lg bg-[#121110] border border-[#262220] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-oriental font-semibold text-sm text-[#f5f1ea]">
                    {set.name}
                  </div>
                  <div className="text-xs text-[#8c8273] mt-0.5 line-clamp-1">
                    {set.description}
                  </div>
                  <div className="font-mono text-sm font-bold text-[#e13b2e] mt-1">
                    NT$ {set.price.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart(
                        {
                          id: set.id,
                          name: set.name,
                          subtitle: set.subtitle,
                          category: 'broth',
                          price: set.price,
                          description: set.description,
                          spiciness: 3,
                          numbing: 3,
                          tags: set.tags,
                        },
                        '正宗巴蜀辣',
                        '標準青花椒麻'
                      );
                    }
                    onOpenCart();
                  }}
                  className="px-3.5 py-1.5 bg-[#252220] hover:bg-[#c22b22] text-[#e5e0d8] hover:text-white text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  外帶選購
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 3: 席位據點與品牌禮賓尊享 (Locations & VIP Concierge) */}
      {/* ============================================================ */}
      <section id="exp-locations" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-latin-display text-[#d49b55] tracking-widest uppercase">
            SECTION 03 · LOCATIONS & PRIVILEGES
          </span>
          <h2 className="font-oriental text-3xl sm:text-4xl font-bold text-[#f5f1ea] tracking-wider">
            門市據點 · 禮賓尊享與常見問題
          </h2>
          <p className="text-xs sm:text-sm text-[#9d9385] max-w-2xl mx-auto">
            雙旗艦門市座落台北精華核心，沉浸體驗當代東方極致美學空間
          </p>
        </div>

        {/* Two Flagships */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flagship 1: Xinyi */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#141211] border border-[#2b2623] space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#c22b22]">FLAGSHIP STORE</span>
              <span className="text-xs text-[#d49b55] font-oriental">台北西門鬧區靜巷雅緻夜景</span>
            </div>
            <div>
              <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea]">
                華神·椒麻 台北西門旗艦店
              </h3>
              <p className="text-xs text-[#9d9385] mt-1">
                景觀雅席 · 近觀璀璨台北夜景
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#c8c1b5] border-t border-b border-[#252220] py-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d49b55] shrink-0" />
                <span>營業時間：每日 11:30 - 02:00（供餐至 01:00）</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8c8273]">
              <span>設有靜謐空間雅座 · 專屬侍餐茶席</span>
              <button
                onClick={() => {
                  document.getElementById('exp-booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#d49b55] hover:underline cursor-pointer"
              >
                即刻預約此店 →
              </button>
            </div>
          </div>

          {/* Flagship 2: Da'an */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#141211] border border-[#2b2623] space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#d49b55]">CONCEPT STORE</span>
              <span className="text-xs text-[#d49b55] font-oriental">靜巷私密廚房</span>
            </div>
            <div>
              <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea]">
                華神·椒麻 概念西門店
              </h3>
              <p className="text-xs text-[#9d9385] mt-1">
                西門幽靜隱密巷弄 · 私密廚房獨立水榭包廂
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#c8c1b5] border-t border-b border-[#252220] py-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d49b55] shrink-0" />
                <span>營業時間：每日 12:00 - 01:00（供餐至 00:00）</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8c8273]">
              <span>靜巷景觀 · 私密品茗雅座</span>
              <button
                onClick={() => {
                  document.getElementById('exp-booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#d49b55] hover:underline cursor-pointer"
              >
                即刻預約此店 →
              </button>
            </div>
          </div>
        </div>

        {/* VIP Club & Privileges */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1b1715] via-[#161413] to-[#121110] border border-[#d49b55]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c22b22]/20 border border-[#c22b22]/40 rounded text-xs text-[#e13b2e] font-oriental">
              <Award className="w-3.5 h-3.5" />
              <span>華神椒友會 · VIP 會員尊榮禮遇</span>
            </div>
            <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea]">
              入會即贈「手炒黑糖豆花券」，生日當月享「漢源水煮魚」免費升級
            </h3>
            <p className="text-xs text-[#9d9385] max-w-xl">
              消費每滿 1,000 元累積 1 點，點數可兌換頂級 A5 和牛大盛與專屬訂造紫銅小鍋。
            </p>
          </div>
          <button
            onClick={() => setIsVipRegistered(true)}
            disabled={isVipRegistered}
            className={`px-6 py-3 font-oriental font-bold text-xs rounded transition-all whitespace-nowrap shadow-md flex items-center gap-1.5 ${
              isVipRegistered
                ? 'bg-emerald-800 text-white cursor-default'
                : 'bg-[#d49b55] hover:bg-[#c58f4c] text-[#0f0e0d]'
            }`}
          >
            {isVipRegistered ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>已成功登記 VIP 會員</span>
              </>
            ) : (
              <span>免費登記椒友會</span>
            )}
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#252220]">
            <HelpCircle className="w-4 h-4 text-[#d49b55]" />
            <h4 className="font-oriental text-base font-semibold text-[#f5f1ea]">
              用餐與外帶常見問題 (FAQ)
            </h4>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg bg-[#141211] border border-[#262220] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs font-medium text-[#f5f1ea] hover:bg-[#1a1715] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8c8273] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#c22b22]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#9d9385] leading-relaxed border-t border-[#221f1d] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
