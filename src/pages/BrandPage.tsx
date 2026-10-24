import React, { useState } from 'react';
import { ArrowRight, Flame, Droplets, Sparkles, UtensilsCrossed, Calendar, Check, Compass, ShieldCheck } from 'lucide-react';
import { AppPage, BlockId } from '../types';
import { BrandLogo } from '../components/BrandLogo';

interface BrandPageProps {
  onNavigatePage: (page: AppPage, targetBlock?: BlockId) => void;
  onOpenVis: () => void;
  onPreSelectReservation: (roomType: 'hall' | 'window' | 'vip') => void;
}

export const BrandPage: React.FC<BrandPageProps> = ({
  onNavigatePage,
  onOpenVis,
  onPreSelectReservation,
}) => {
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<number>(2);

  const spiceLevels = [
    {
      level: 1,
      title: '椒香微辣 · 初見清潤',
      subtitle: 'Mild Fragrant Spice',
      oilTemp: '180°C 輕油淋淋',
      peppercorn: '青花椒佔比 70%',
      desc: '溫柔喚醒味蕾，花椒清香如初春山嵐，微辛而不嗆喉，適合喜好清雅鮮麻之饕客。',
    },
    {
      level: 2,
      title: '正宗巴蜀 · 沸騰平衡',
      subtitle: 'Authentic Sichuan Classic',
      oilTemp: '200°C 經典滾燙',
      peppercorn: '紅袍與青椒 1:1 黃金配比',
      desc: '主廚推薦黃金平衡點！二荊條乾椒之深邃香氣與漢源貢椒之穿透麻勁完美交融，回味悠長。',
    },
    {
      level: 3,
      title: '重辣重麻 · 川魂赤浪',
      subtitle: 'Intense Fiery Sichuan Soul',
      oilTemp: '220°C 熱油烈焰爆香',
      peppercorn: '漢源頂級大紅袍 85%',
      desc: '嗜辣狂徒的極致之境！高溫牛油與石柱紅猛烈綻放，舌尖戰慄、額頭微汗，暢快淋漓。',
    },
  ];

  const craftsmanshipIngredients = [
    {
      name: '四川漢源貢椒',
      origin: '四川省漢源縣 · 海拔 1600m',
      role: '麻味靈魂',
      note: '自唐代起即為皇家貢品，油脂豐富，香氣清幽且穿透力極強，無苦澀回味。',
    },
    {
      name: '金陽初採青花椒',
      origin: '大涼山金陽縣 · 清晨手摘',
      role: '清雅鮮香',
      note: '揮發油含量達8.2%，帶有天然柑橘檸檬果香，為水煮魚注入鮮活清爽骨架。',
    },
    {
      name: '郫縣三年陳釀豆瓣',
      origin: '四川郫都區 · 晴天曬夜露',
      role: '底韻醬香',
      note: '純手工翻曬三載，色澤褐紅油潤，醬脂香厚重，為牛油老火鍋奠定沉穩底味。',
    },
    {
      name: '高山初榨老茶油',
      origin: '巴蜀高山野生油茶籽',
      role: '溫潤護胃',
      note: '低溫初榨，不含膽固醇。與天然牛油按黃金比例調和，吃完不燥火、不膩口。',
    },
    {
      name: '現撈山泉活烏魚',
      origin: '天然冷泉活水生態養殖',
      role: '鮮滑極致',
      note: '只選兩斤二兩正負一兩的成年活魚，肉質緊緻少刺，經手工斜刀厚切，滑嫩脆彈。',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* ============================================================ */}
      {/* BLOCK 1: 震撼主視覺與品牌精神 (Hero & Modern Oriental VI) */}
      {/* ============================================================ */}
      <section id="brand-hero" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16">
        {/* Background visual with subtle contrast scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/hero_mala_hotpot_boiled_fish_1790659165650.jpg"
            alt="華神·椒麻 極致饗宴 麻辣火鍋與水煮魚"
            className="w-full h-full object-cover object-center scale-105 filter brightness-70"
            referrerPolicy="no-referrer"
          />
          {/* Measured Gradient Scrim for WCAG contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/75 to-[#0d0c0b]/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0d0c0b]/40 to-[#0d0c0b]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          {/* Editorial Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1614]/80 border border-[#d49b55]/40 rounded-full text-xs text-[#d49b55]">
            <Flame className="w-3.5 h-3.5 text-[#c22b22]" />
            <span className="font-oriental font-medium">現代東方極致美學 · 巴蜀雙絕經典問鼎</span>
          </div>

          {/* Large Hero Brand Emblem & Heading */}
          <div className="space-y-4">
            <h1 className="font-oriental text-4xl sm:text-6xl lg:text-7xl font-bold text-[#f6f4f0] tracking-wider leading-tight text-balance">
              川蜀精髓 · 雙絕並立
            </h1>
            <p className="font-oriental text-xl sm:text-2xl text-[#d49b55] tracking-widest font-medium">
              漢源鮮椒騰浪 · 百年經典問鼎
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#d8d2c7] leading-relaxed font-light">
            華神·椒麻 極致饗宴以當代東方美學重新詮釋川蜀飲食精髓。
            一端是220度熱油現潑、鮮麻交響的水煮魚；一端是手炒十八道工序、茶油調和的麻辣老火鍋。
            雙絕並立，讓滾燙火光在靜謐空間中沸騰綻放。
          </p>

          {/* Three Interconnected Action Gateways */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Action 1: Jump to Page 2 Block 1 */}
            <button
              onClick={() => onNavigatePage('menu', 'menu-broths')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded transition-all shadow-lg hover:shadow-red-950/50 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>探索典藏菜單 · 沸騰雙雄</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Action 2: Jump to Page 3 Block 1 */}
            <button
              onClick={() => onNavigatePage('experience', 'exp-booking')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#201d1a]/90 hover:bg-[#2e2a26] text-[#f5f1ea] border border-[#d49b55]/40 text-xs font-semibold rounded transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#d49b55]" />
              <span>線上尊榮訂位 · 預留鮮魚</span>
            </button>

            {/* Action 3: Open VIS Manual */}
            <button
              onClick={onOpenVis}
              className="w-full sm:w-auto px-5 py-3.5 bg-transparent hover:bg-white/5 text-[#d49b55] border border-[#d49b55]/25 text-xs font-medium rounded transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>品牌 VIS 識別系統手冊</span>
            </button>
          </div>

          {/* Interactive Spice Dial Preview */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="p-4 sm:p-5 rounded-xl bg-[#141211]/90 border border-[#2d2825] backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#252220]">
                <div className="flex items-center gap-2 text-xs">
                  <Flame className="w-4 h-4 text-[#c22b22]" />
                  <span className="font-oriental font-semibold text-[#f5f1ea]">
                    華神川味麻辣階梯測驗
                  </span>
                  <span className="text-[#8e8477]">（點擊切換感官階度）</span>
                </div>
                <span className="text-[11px] font-mono text-[#d49b55]">
                  {spiceLevels[selectedSpiceLevel - 1].oilTemp}
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {spiceLevels.map((lvl) => (
                  <button
                    key={lvl.level}
                    onClick={() => setSelectedSpiceLevel(lvl.level)}
                    className={`p-2 rounded text-left transition-all border ${
                      selectedSpiceLevel === lvl.level
                        ? 'bg-[#221d1a] border-[#c22b22] text-[#f5f1ea] shadow-sm'
                        : 'bg-[#181614] border-transparent text-[#8c8273] hover:text-[#e5e0d8]'
                    }`}
                  >
                    <div className="text-xs font-oriental font-medium truncate">{lvl.title}</div>
                    <div className="text-[10px] text-[#807669] font-latin-display truncate">{lvl.subtitle}</div>
                  </button>
                ))}
              </div>

              {/* Detail readout */}
              <div className="mt-3 p-3 bg-[#0d0c0b] rounded border border-[#1f1d1b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-[#c8c1b5] leading-relaxed">
                  {spiceLevels[selectedSpiceLevel - 1].desc}
                </p>
                <div className="shrink-0 flex items-center gap-3 text-[11px] text-[#d49b55]">
                  <span>{spiceLevels[selectedSpiceLevel - 1].peppercorn}</span>
                  <button
                    onClick={() => onNavigatePage('experience', 'exp-takeout')}
                    className="underline hover:text-white"
                  >
                    以此辣度外帶點餐 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 2: 雙絕匠心魂 (The Twin Specialties: Nine-Grid & Boiled Fish) */}
      {/* ============================================================ */}
      <section id="brand-heritage" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-latin-display text-[#d49b55] tracking-widest uppercase">
            02 · THE TWIN SICHUAN SPECIALTIES
          </span>
          <h2 className="font-oriental text-3xl sm:text-4xl font-bold text-[#f5f1ea] tracking-wider">
            雙絕匠心· 經典問鼎
          </h2>
          <p className="text-xs sm:text-sm text-[#9d9385] max-w-2xl mx-auto">
            以水載魚，鮮嫩如緞；以火淬鼎，現潑沸騰。華神雙絕代表川味飲食的至高境界。
          </p>
        </div>

        {/* Twin Showcase Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Twin 1: 水煮魚 */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#141211] border border-[#2b2623] hover:border-[#d49b55]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#332c28]">
                <img
                  src="/src/assets/images/dish_boiled_fish_peppercorn_1790659179520.jpg"
                  alt="漢源花椒現潑沸騰水煮魚"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#c22b22] text-white px-2.5 py-1 text-xs font-oriental rounded">
                  鎮店第一絕 · 現潑沸騰
                </div>
              </div>

              <div>
                <span className="text-[11px] font-latin-display text-[#d49b55]">SIGNATURE SPECIALTY I</span>
                <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea] mt-1">
                  漢源貢椒沸騰現片黑魚
                </h3>
                <p className="text-xs text-[#a09688] mt-2 leading-relaxed">
                  水煮魚之精奧在於「沸而不老、油滾魚嫩」。我們捨棄厚重麵粉裹衣，僅以微量蛋清與山泉水輕漿鎖水。上桌前，將熱至220度的漢源花椒油直接澆淋於堆疊如山的鮮紅椒段與生花椒粒上，油花歡騰、白煙繚繞，椒香瞬間炸裂。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">選魚標準</span>
                  <span className="font-oriental font-semibold text-[#f5f1ea] mt-0.5 block">兩斤兩兩黑魚</span>
                </div>
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">刀工規格</span>
                  <span className="font-oriental font-semibold text-[#f5f1ea] mt-0.5 block">1.8mm 斜刀透光</span>
                </div>
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">潑油溫度</span>
                  <span className="font-oriental font-semibold text-[#d49b55] mt-0.5 block">220°C 瞬間激香</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#252220] flex items-center justify-between">
              <span className="font-mono text-base font-bold text-[#e13b2e]">NT$ 1,880</span>
              <button
                onClick={() => onNavigatePage('menu', 'menu-broths')}
                className="text-xs text-[#d49b55] hover:text-[#f5f1ea] flex items-center gap-1 group font-medium"
              >
                <span>查看水煮魚詳細規格與配方</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Twin 2: 麻辣老火鍋 */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#141211] border border-[#2b2623] hover:border-[#d49b55]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#332c28]">
                <img
                  src="/src/assets/images/hero_mala_hotpot_boiled_fish_1790659165650.jpg"
                  alt="重慶百年古法牛油麻辣鍋"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#d49b55] text-[#0f0e0d] px-2.5 py-1 text-xs font-oriental font-bold rounded">
                  鎮店第二絕 · 古法老茶油
                </div>
              </div>

              <div>
                <span className="text-[11px] font-latin-display text-[#d49b55]">SIGNATURE SPECIALTY II</span>
                <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea] mt-1">
                  重慶百年古法牛油老火鍋
                </h3>
                <p className="text-xs text-[#a09688] mt-2 leading-relaxed">
                  九宮之妙，在於「格格不同溫，菜菜各得其所」。中心格沸浪翻滾，最宜七上八下燙鮮毛肚與鴨腸；十字格中火慢煨，適合和牛與排骨入味；四角格微沸溫煮，最宜鴨血與厚豆腐吸汁。老茶油調和純牛油，厚而不膩，辣不上火。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">炒料工序</span>
                  <span className="font-oriental font-semibold text-[#f5f1ea] mt-0.5 block">手工十八道慢炒</span>
                </div>
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">油湯配比</span>
                  <span className="font-oriental font-semibold text-[#f5f1ea] mt-0.5 block">茶油 3 : 牛油 7</span>
                </div>
                <div className="p-2.5 rounded bg-[#1b1816] border border-[#24201e]">
                  <span className="text-[#8c8273] block text-[10px]">九格控溫</span>
                  <span className="font-oriental font-semibold text-[#d49b55] mt-0.5 block">中沸·十煨·角微</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#252220] flex items-center justify-between">
              <span className="font-mono text-base font-bold text-[#e13b2e]">NT$ 1,280</span>
              <button
                onClick={() => onNavigatePage('menu', 'menu-broths')}
                className="text-xs text-[#d49b55] hover:text-[#f5f1ea] flex items-center gap-1 group font-medium"
              >
                <span>查看麻辣鍋底涮菜技巧</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Craftsmanship Ingredient Table */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#11100f] border border-[#262220] space-y-4">
          <div className="flex items-center justify-between border-b border-[#252220] pb-3">
            <div>
              <h3 className="font-oriental text-lg font-bold text-[#f5f1ea]">
                五味靈魂 · 巴蜀原產地溯源認證
              </h3>
              <p className="text-xs text-[#8e8477]">
                華神恪守正統川味道地食材，所有辣椒與花椒均於川西高山當季直採
              </p>
            </div>
            <ShieldCheck className="w-6 h-6 text-[#d49b55]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {craftsmanshipIngredients.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-lg bg-[#171514] border border-[#24201e] space-y-1.5"
              >
                <div className="text-[10px] font-mono text-[#c22b22] uppercase">{item.role}</div>
                <div className="font-oriental text-sm font-semibold text-[#f5f1ea]">{item.name}</div>
                <div className="text-[11px] text-[#d49b55]">{item.origin}</div>
                <p className="text-[11px] text-[#807669] leading-relaxed pt-1">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 3: 空間美學與感官體驗 (Oriental Spatial Aesthetics) */}
      {/* ============================================================ */}
      <section id="brand-space" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-latin-display text-[#d49b55] tracking-widest uppercase">
            03 · MODERN ORIENTAL SPATIAL AESTHETICS
          </span>
          <h2 className="font-oriental text-3xl sm:text-4xl font-bold text-[#f5f1ea] tracking-wider">
            香榭頂極 · 溫潤光中的當代雅席
          </h2>
          <p className="text-xs sm:text-sm text-[#9d9385] max-w-2xl mx-auto">
            以黑胡桃木格柵、玄青磚石、鍛造紅銅與溫潤柔光，構築高私密度的東方饗宴場域。
          </p>
        </div>

        {/* Atmosphere Feature Box */}
        <div className="relative rounded-2xl overflow-hidden border border-[#2f2926] shadow-2xl">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full">
            <img
              src="/src/assets/images/interior_oriental_dining_ambiance_1790659204028.jpg"
              alt="華神·椒麻 極致饗宴 東方美學空間"
              className="w-full h-full object-cover filter brightness-85"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c] via-[#0e0d0c]/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono text-[#d49b55]">SPATIAL PHILOSOPHY</span>
              <h3 className="font-oriental text-2xl sm:text-3xl font-bold text-[#f5f1ea]">
                美味在席間盡興綻放
              </h3>
              <p className="text-xs sm:text-sm text-[#c8c1b5] leading-relaxed">
                全天候保持空氣清新循環，餐畢衣物清新不留異味。每席之間區隔有致，兼顧私密對話與開闊視野。
              </p>
            </div>
          </div>
        </div>

        {/* 3 Specific Seating Types with Direct Reservation Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Seat 1: Hall */}
          <div className="p-6 rounded-xl bg-[#141211] border border-[#292523] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d49b55]">SEATING I</span>
                <span className="text-xs text-[#8c8273]">適合 2 - 4 人</span>
              </div>
              <h4 className="font-oriental text-xl font-bold text-[#f5f1ea]">
                「凝香雅緻」獨立雅座
              </h4>
              <p className="text-xs text-[#9d9385] leading-relaxed">
                特設獨立雅座，感受冷麻的火鍋凝香。桌間距保持1.8米以上，自在暢談無壓迫。
              </p>
            </div>
            <button
              onClick={() => {
                onPreSelectReservation('hall');
                onNavigatePage('experience', 'exp-booking');
              }}
              className="w-full py-2.5 bg-[#1f1b19] hover:bg-[#c22b22] text-[#e5e0d8] hover:text-white text-xs font-medium rounded transition-colors border border-[#352f2b] hover:border-transparent flex items-center justify-center gap-1.5"
            >
              <span>預約獨立雅座</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Seat 2: Window Booth */}
          <div className="p-6 rounded-xl bg-[#141211] border border-[#292523] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d49b55]">SEATING II</span>
                <span className="text-xs text-[#8c8273]">適合 4 - 6 人</span>
              </div>
              <h4 className="font-oriental text-xl font-bold text-[#f5f1ea]">
                「椒蘭香榭」景觀雅座
              </h4>
              <p className="text-xs text-[#9d9385] leading-relaxed">
                臨窗半開放卡座，靜觀台北西門鬧區靜巷繁華璀璨夜景。高椅背皮革屏風包覆，兼具開闊天際線與私密聚會氛圍。
              </p>
            </div>
            <button
              onClick={() => {
                onPreSelectReservation('window');
                onNavigatePage('experience', 'exp-booking');
              }}
              className="w-full py-2.5 bg-[#1f1b19] hover:bg-[#c22b22] text-[#e5e0d8] hover:text-white text-xs font-medium rounded transition-colors border border-[#352f2b] hover:border-transparent flex items-center justify-center gap-1.5"
            >
              <span>預約臨窗景觀雅座</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Seat 3: VIP Room */}
          <div className="p-6 rounded-xl bg-[#141211] border border-[#292523] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d49b55]">SEATING III</span>
                <span className="text-xs text-[#8c8273]">適合 8 - 14 人</span>
              </div>
              <h4 className="font-oriental text-xl font-bold text-[#f5f1ea]">
                「丹霞九霄」獨立貴賓包廂
              </h4>
              <p className="text-xs text-[#9d9385] leading-relaxed">
                專屬私人侍餐管家、獨立品茗茶席、酒窖專屬陳列與客製化雙鍋底。商務宴請、名流家宴與重要慶祝首選。
              </p>
            </div>
            <button
              onClick={() => {
                onPreSelectReservation('vip');
                onNavigatePage('experience', 'exp-booking');
              }}
              className="w-full py-2.5 bg-[#25201c] hover:bg-[#c22b22] text-[#d49b55] hover:text-white text-xs font-medium rounded transition-colors border border-[#d49b55]/40 hover:border-transparent flex items-center justify-center gap-1.5"
            >
              <span>預約獨立包廂 (免服務費)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
