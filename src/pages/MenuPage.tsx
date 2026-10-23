import React, { useState } from 'react';
import { Flame, Droplets, Plus, Check, ShoppingBag, Sparkles, ArrowRight, Info, Heart, ChefHat, Utensils, Wine } from 'lucide-react';
import { MenuItem, AppPage, BlockId } from '../types';
import { MENU_ITEMS, SET_MENUS, CHEF_PAIRINGS } from '../data/menuData';

interface MenuPageProps {
  onAddToCart: (item: MenuItem, spiciness: string, numbing: string) => void;
  onNavigatePage: (page: AppPage, targetBlock?: BlockId) => void;
  onPreSelectPotInBooking: (dishName: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onAddToCart,
  onNavigatePage,
  onPreSelectPotInBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'meat' | 'seafood' | 'tapas'>('all');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [selectedPairingDishId, setSelectedPairingDishId] = useState<string>('dish-boiled-fish-black');

  // Grouped items
  const brothAndFishItems = MENU_ITEMS.filter(
    (item) => item.category === 'boiled-fish' || item.category === 'broth'
  );

  const activePairing = CHEF_PAIRINGS[selectedPairingDishId] || CHEF_PAIRINGS['dish-boiled-fish-black'];
  const activeMainDish = MENU_ITEMS.find((m) => m.id === selectedPairingDishId) || brothAndFishItems[0];


  const meatAndTapasItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === 'all') {
      return item.category === 'meat' || item.category === 'seafood' || item.category === 'tapas';
    }
    return item.category === selectedCategory;
  });

  const drinkAndDessertItems = MENU_ITEMS.filter((item) => item.category === 'drink');

  const handleAdd = (item: MenuItem, spiciness = '標準正宗辣', numbing = '標準花椒麻') => {
    onAddToCart(item, spiciness, numbing);
    setAddedItemNotice(item.name);
    setTimeout(() => setAddedItemNotice(null), 2000);
  };

  const renderSpiceFlames = (spiciness: number, numbing: number) => {
    return (
      <div className="flex items-center gap-3 text-[11px] text-[#9c9183]">
        {spiciness > 0 ? (
          <div className="flex items-center gap-0.5">
            <span className="text-[#8c8273]">辣度</span>
            <div className="flex text-[#c22b22]">
              {Array.from({ length: 4 }).map((_, i) => (
                <Flame
                  key={i}
                  className={`w-3 h-3 ${i < spiciness ? 'fill-[#c22b22]' : 'text-[#38322e]'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <span className="text-[#788e70]">清鮮溫潤</span>
        )}

        {numbing > 0 && (
          <div className="flex items-center gap-0.5">
            <span className="text-[#8c8273]">麻度</span>
            <div className="flex text-[#d49b55]">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                    i < numbing ? 'bg-[#d49b55]' : 'bg-[#38322e]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Toast alert for item addition */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#c22b22] text-white text-xs font-medium rounded-lg shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>已將「{addedItemNotice}」加入外帶餐袋！</span>
        </div>
      )}

      {/* Menu Hero Header */}
      <section className="pt-10 pb-4 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <span className="text-xs font-latin-display text-[#d49b55] tracking-widest uppercase">
          GRAND CULINARY REPERTOIRE
        </span>
        <h1 className="font-oriental text-4xl sm:text-5xl font-bold text-[#f5f1ea] tracking-wider">
          珍饈典藏 · 華神巴蜀菜單
        </h1>
        <p className="text-xs sm:text-sm text-[#9d9385] max-w-xl mx-auto leading-relaxed">
          全品項遵循現代東方美學排版，標注辣麻指數、品鑑指南與外帶即時預訂。亦可於線上訂位時提前指定備料。
        </p>

        {/* Set Menu Banner */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {SET_MENUS.map((set) => (
            <div
              key={set.id}
              className="p-5 rounded-xl bg-gradient-to-br from-[#1b1715] to-[#121110] border border-[#d49b55]/30 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#c22b22] text-white text-[10px] font-oriental rounded">
                      主廚推薦套宴
                    </span>
                    <span className="text-xs text-[#d49b55] font-latin-display">{set.subtitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-xs text-[#73685a] font-mono mr-1.5">
                      NT$ {set.originalPrice}
                    </span>
                    <span className="font-mono text-base font-bold text-[#e13b2e]">
                      NT$ {set.price}
                    </span>
                  </div>
                </div>
                <h3 className="font-oriental text-lg font-bold text-[#f5f1ea] mt-2">
                  {set.name}
                </h3>
                <p className="text-xs text-[#9d9385] mt-1 leading-relaxed">
                  {set.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#262220]">
                <div className="flex items-center gap-2">
                  {set.tags.map((t) => (
                    <span key={t} className="text-[11px] text-[#b3a899]">
                      · {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onPreSelectPotInBooking(set.name);
                      onNavigatePage('experience', 'exp-booking');
                    }}
                    className="px-3 py-1 bg-[#252220] hover:bg-[#342e2a] text-[#d49b55] text-xs rounded transition-colors"
                  >
                    訂位預留套宴
                  </button>
                  <button
                    onClick={() =>
                      handleAdd(
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
                      )
                    }
                    className="px-3 py-1 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-medium rounded transition-colors"
                  >
                    外帶下單
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 1: 鎮店雙雄鍋底與沸騰活魚 (Signature Broths & Boiled Fish) */}
      {/* ============================================================ */}
      <section id="menu-broths" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2d2825]">
          <div>
            <span className="text-xs font-mono text-[#d49b55]">MENU SECTION 01</span>
            <h2 className="font-oriental text-3xl font-bold text-[#f5f1ea] mt-1">
              鎮店雙雄 · 漢源貢椒沸騰活魚與麻辣老火鍋
            </h2>
            <p className="text-xs text-[#9d9385] mt-1">
              現撈烏魚黑魚、山泉鱸魚活片熱油現淋；百年老茶油配方重慶老火鍋
            </p>
          </div>
          <button
            onClick={() => onNavigatePage('brand', 'brand-heritage')}
            className="text-xs text-[#d49b55] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>深入了解雙絕炒料工藝</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brothAndFishItems.map((dish) => (
            <div
              key={dish.id}
              className="p-6 rounded-xl bg-[#141211] border border-[#2b2623] hover:border-[#d49b55]/40 transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Dish Photo if available */}
                {dish.image && (
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#2e2824]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {dish.isSignature && (
                      <span className="absolute top-2.5 left-2.5 bg-[#c22b22] text-white text-[11px] font-oriental px-2 py-0.5 rounded shadow">
                        鎮店招牌
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-latin-display text-[#d49b55]">
                      {dish.subtitle}
                    </span>
                    <span className="font-mono text-xl font-bold text-[#e13b2e]">
                      NT$ {dish.price.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="font-oriental text-2xl font-bold text-[#f5f1ea] mt-1">
                    {dish.name}
                  </h3>
                  <div className="mt-2">{renderSpiceFlames(dish.spiciness, dish.numbing)}</div>
                </div>

                <p className="text-xs text-[#a09688] leading-relaxed">
                  {dish.description}
                </p>

                {dish.pairingAdvice && (
                  <div className="p-3 bg-[#1a1715] rounded border border-[#262220] flex items-start gap-2 text-xs text-[#9d9385]">
                    <Sparkles className="w-3.5 h-3.5 text-[#d49b55] shrink-0 mt-0.5" />
                    <span>{dish.pairingAdvice}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#252220] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPairingDishId(dish.id);
                      const el = document.getElementById('chef-pairing-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-2 text-xs rounded transition-colors flex items-center gap-1.5 ${
                      selectedPairingDishId === dish.id
                        ? 'bg-[#c22b22]/20 text-[#e13b2e] border border-[#c22b22]/60 font-medium shadow-sm'
                        : 'bg-[#191715] text-[#d49b55] hover:text-[#f5f1ea] border border-[#d49b55]/30'
                    }`}
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>查看主廚搭餐推薦</span>
                  </button>
                  <button
                    onClick={() => {
                      onPreSelectPotInBooking(dish.name);
                      onNavigatePage('experience', 'exp-booking');
                    }}
                    className="hidden sm:inline-flex px-3 py-2 text-xs text-[#a09688] hover:text-[#f5f1ea] bg-[#1d1a18] hover:bg-[#2b2623] rounded transition-colors border border-[#352f2b]"
                  >
                    預留此鍋
                  </button>
                </div>
                <button
                  onClick={() => handleAdd(dish)}
                  className="px-4 py-2 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>加入外帶</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* CHEF'S PAIRING SECTION (主廚佐餐鑑賞 · 雙雄黃金搭檔) */}
        {/* ============================================================ */}
        <div
          id="chef-pairing-section"
          className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#181514] via-[#141211] to-[#11100f] border border-[#d49b55]/40 shadow-2xl space-y-8 scroll-mt-24"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#2d2825] gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#c22b22]/15 border border-[#c22b22]/40 rounded text-xs text-[#e13b2e] font-oriental">
                <ChefHat className="w-3.5 h-3.5" />
                <span>CHEF'S PAIRING · 主廚佐餐哲學</span>
              </div>
              <h3 className="font-oriental text-2xl sm:text-3xl font-bold text-[#f5f1ea] tracking-wide">
                主廚佐餐鑑賞 · 雙雄黃金搭檔
              </h3>
              <p className="text-xs text-[#9d9385]">
                依據您選擇的水煮魚或火鍋，精選最契合的巴蜀名物與解辣甘霖，實現層次豐富的感官交響
              </p>
            </div>

            {/* Dish Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0f0e0d] rounded-lg border border-[#2b2623] overflow-x-auto">
              {brothAndFishItems.map((dish) => {
                const isSelected = selectedPairingDishId === dish.id;
                return (
                  <button
                    key={dish.id}
                    onClick={() => setSelectedPairingDishId(dish.id)}
                    className={`px-3 py-2 text-xs font-oriental rounded transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#c22b22] text-white shadow-md font-semibold'
                        : 'text-[#8c8273] hover:text-[#e5e0d8]'
                    }`}
                  >
                    {dish.name.replace(/（.*）/, '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Main Dish Overview & Poetic Rationale */}
          <div className="p-5 rounded-xl bg-[#12100f] border border-[#272320] flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#d49b55]">CURRENT SELECTED DISH</span>
                <span className="text-xs text-[#807669]">·</span>
                <span className="text-xs text-[#e13b2e] font-oriental">
                  {activeMainDish?.name} (NT$ {activeMainDish?.price})
                </span>
              </div>
              <h4 className="font-oriental text-xl sm:text-2xl font-bold text-[#f5f1ea]">
                {activePairing.title}
              </h4>
              <p className="font-oriental text-xs sm:text-sm text-[#d49b55] italic">
                {activePairing.slogan}
              </p>
              <p className="text-xs text-[#a49a8c] leading-relaxed pt-1 max-w-3xl">
                {activePairing.culinaryPrinciple}
              </p>
            </div>

            <div className="shrink-0 p-3 bg-[#181514] rounded-lg border border-[#2e2926] text-center space-y-1">
              <span className="text-[10px] font-mono text-[#8c8273] block">RECOMMENDED TEMPO</span>
              <span className="font-oriental text-xs text-[#f5f1ea] font-medium block">
                一啖鮮魚 · 一口酥香 · 一啜甘梅
              </span>
            </div>
          </div>

          {/* Suggestions Grid: Side Dishes vs Beverages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Suggested Side Dishes & Meats */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#252220]">
                <Utensils className="w-4 h-4 text-[#d49b55]" />
                <h4 className="font-oriental text-base font-semibold text-[#f5f1ea]">
                  推薦巴蜀名物與涮料（口感與層次互補）
                </h4>
              </div>

              <div className="space-y-4">
                {activePairing.recommendedSides.map((rec) => {
                  const dish = MENU_ITEMS.find((m) => m.id === rec.dishId);
                  if (!dish) return null;
                  return (
                    <div
                      key={rec.dishId}
                      className="p-4 rounded-xl bg-[#161413] border border-[#2a2623] hover:border-[#d49b55]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        {dish.image && (
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#332e2a]"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-oriental font-semibold text-sm text-[#f5f1ea]">
                              {dish.name}
                            </span>
                            <span className="text-[10px] font-oriental px-1.5 py-0.2 bg-[#c22b22]/15 text-[#e13b2e] border border-[#c22b22]/30 rounded">
                              {rec.pairingRole}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#9d9385] leading-relaxed max-w-sm">
                            {rec.whyItPairs}
                          </p>
                          <div className="font-mono text-xs font-bold text-[#e13b2e]">
                            NT$ {dish.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdd(dish)}
                        className="w-full sm:w-auto px-3.5 py-1.5 bg-[#25211e] hover:bg-[#c22b22] text-[#f5f1ea] hover:text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1 shrink-0 whitespace-nowrap shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>加購此名物</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Suggested Beverages & Desserts */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#252220]">
                <Wine className="w-4 h-4 text-[#d49b55]" />
                <h4 className="font-oriental text-base font-semibold text-[#f5f1ea]">
                  推薦解辣甘霖與特釀（生津、降火、提鮮）
                </h4>
              </div>

              <div className="space-y-4">
                {activePairing.recommendedBeverages.map((rec) => {
                  const dish = MENU_ITEMS.find((m) => m.id === rec.dishId);
                  if (!dish) return null;
                  return (
                    <div
                      key={rec.dishId}
                      className="p-4 rounded-xl bg-[#161413] border border-[#2a2623] hover:border-[#d49b55]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-16 h-16 rounded-lg bg-[#201d1a] border border-[#332e2a] flex items-center justify-center shrink-0 text-[#d49b55]">
                          <Wine className="w-7 h-7 opacity-80" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-oriental font-semibold text-sm text-[#f5f1ea]">
                              {dish.name}
                            </span>
                            <span className="text-[10px] font-oriental px-1.5 py-0.2 bg-[#d49b55]/15 text-[#d49b55] border border-[#d49b55]/30 rounded">
                              {rec.pairingRole}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#9d9385] leading-relaxed max-w-sm">
                            {rec.whyItPairs}
                          </p>
                          <div className="font-mono text-xs font-bold text-[#e13b2e]">
                            NT$ {dish.price}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdd(dish)}
                        className="w-full sm:w-auto px-3.5 py-1.5 bg-[#25211e] hover:bg-[#c22b22] text-[#f5f1ea] hover:text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1 shrink-0 whitespace-nowrap shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>加購此特調</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Master 1-Click Bundle Bar */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#211d1a] via-[#1c1816] to-[#141211] border border-[#d49b55]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d49b55]" />
                <span className="font-oriental font-bold text-sm text-[#f5f1ea]">
                  一鍵品鑑 · 主廚黃金搭檔三件套
                </span>
                <span className="text-[10px] text-[#d49b55] border border-[#d49b55]/30 px-1.5 rounded">
                  主菜 + 招牌名物 + 解辣特調
                </span>
              </div>
              <p className="text-xs text-[#8e8477] mt-0.5">
                包含「{activeMainDish?.name}」+「{MENU_ITEMS.find((m) => m.id === activePairing.recommendedSides[0].dishId)?.name}」+「{MENU_ITEMS.find((m) => m.id === activePairing.recommendedBeverages[0].dishId)?.name}」
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  const sideItem = MENU_ITEMS.find((m) => m.id === activePairing.recommendedSides[0].dishId);
                  const drinkItem = MENU_ITEMS.find((m) => m.id === activePairing.recommendedBeverages[0].dishId);
                  if (activeMainDish) handleAdd(activeMainDish);
                  if (sideItem) handleAdd(sideItem);
                  if (drinkItem) handleAdd(drinkItem);
                  setAddedItemNotice(`${activeMainDish?.name} 主廚黃金搭檔三件套`);
                  setTimeout(() => setAddedItemNotice(null), 2500);
                }}
                className="px-5 py-2.5 bg-[#c22b22] hover:bg-[#a9221a] text-white text-xs font-semibold rounded transition-colors shadow-md flex items-center gap-1.5 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>一鍵打包入外帶餐袋</span>
              </button>

              <button
                onClick={() => {
                  onPreSelectPotInBooking(
                    `${activeMainDish?.name}（佐配：${MENU_ITEMS.find((m) => m.id === activePairing.recommendedSides[0].dishId)?.name} + ${MENU_ITEMS.find((m) => m.id === activePairing.recommendedBeverages[0].dishId)?.name}）`
                  );
                  onNavigatePage('experience', 'exp-booking');
                }}
                className="px-4 py-2.5 bg-[#1b1816] hover:bg-[#2b2623] text-[#d49b55] hover:text-[#f5f1ea] text-xs font-medium rounded transition-colors border border-[#d49b55]/30 whitespace-nowrap"
              >
                以此組合預約訂位
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 2: 極品涮料與巴蜀名物 (Premium Meats, Tripe & Tapas) */}
      {/* ============================================================ */}

      <section id="menu-meats" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2d2825]">
          <div>
            <span className="text-xs font-mono text-[#d49b55]">MENU SECTION 02</span>
            <h2 className="font-oriental text-3xl font-bold text-[#f5f1ea] mt-1">
              極品涮料 · 日本A5和牛與冷鏈直運鮮毛肚
            </h2>
            <p className="text-xs text-[#9d9385] mt-1">
              七上八下8秒鮮脆、大刀現切吊龍與手工黑松露蝦滑
            </p>
          </div>

          {/* Category Filter Buttons (Functional Tabs per anti-slop rules) */}
          <div className="flex items-center gap-1 p-1 bg-[#191715] rounded-lg border border-[#2d2825] shrink-0 overflow-x-auto">
            {[
              { id: 'all', label: '全品項' },
              { id: 'meat', label: '極上肉品' },
              { id: 'seafood', label: '特選海鮮' },
              { id: 'tapas', label: '巴蜀小食' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#c22b22] text-white shadow-sm'
                    : 'text-[#8c8273] hover:text-[#f5f1ea]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meat and Tapas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {meatAndTapasItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-[#141211] border border-[#282422] hover:border-[#d49b55]/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {item.image && (
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2b2521]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.isSignature && (
                      <span className="absolute top-2 left-2 bg-[#d49b55] text-[#121110] text-[10px] font-oriental font-bold px-2 py-0.5 rounded">
                        必涮金賞
                      </span>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-latin-display text-[#d49b55]">
                      {item.subtitle}
                    </span>
                    <span className="font-mono text-base font-bold text-[#e13b2e]">
                      NT$ {item.price}
                    </span>
                  </div>
                  <h3 className="font-oriental text-lg font-bold text-[#f5f1ea] mt-0.5">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-[#9d9385] leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-[#a69c8e] bg-[#1a1715] px-2 py-0.5 rounded border border-[#282422]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#221f1d] flex items-center justify-between">
                <span className="text-[11px] text-[#736a5e]">
                  {item.category === 'meat' ? '七上八下煮 6-8 秒' : item.category === 'tapas' ? '即食現點現炸' : '水滾煮 3 分鐘'}
                </span>
                <button
                  onClick={() => handleAdd(item)}
                  className="px-3 py-1.5 bg-[#25211e] hover:bg-[#c22b22] text-[#f5f1ea] hover:text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>加入外帶</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BLOCK 3: 解辣甘霖與特選珍釀 (Spice-Relief Drinks & Desserts) */}
      {/* ============================================================ */}
      <section id="menu-drinks" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2d2825]">
          <div>
            <span className="text-xs font-mono text-[#d49b55]">MENU SECTION 03</span>
            <h2 className="font-oriental text-3xl font-bold text-[#f5f1ea] mt-1">
              解辣甘霖 · 古法黑糖白玉豆花與特釀桂花酸梅湯
            </h2>
            <p className="text-xs text-[#9d9385] mt-1">
              生津化油、降火解麻，為熱辣川宴劃下甘醇句點
            </p>
          </div>
          <div className="p-2.5 bg-[#191715] rounded border border-[#2c2724] text-xs text-[#d49b55]">
            💡 凡內用點「漢源水煮魚」即享老樹酸梅湯續杯半價
          </div>
        </div>

        {/* Drink Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {drinkAndDessertItems.map((drink) => (
            <div
              key={drink.id}
              className="p-5 rounded-xl bg-[#141211] border border-[#282422] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-latin-display text-[#d49b55]">ELIXIR</span>
                  <span className="font-mono text-base font-bold text-[#e13b2e]">
                    NT$ {drink.price}
                  </span>
                </div>
                <h3 className="font-oriental text-lg font-bold text-[#f5f1ea]">
                  {drink.name}
                </h3>
                <p className="text-xs text-[#9d9385] leading-relaxed">
                  {drink.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {drink.tags.map((t) => (
                    <span key={t} className="text-[10px] text-[#7d7366]">
                      · {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAdd(drink)}
                className="w-full py-2 bg-[#211d1a] hover:bg-[#c22b22] text-[#f5f1ea] hover:text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>加入外帶</span>
              </button>
            </div>
          ))}
        </div>

        {/* Spice Relief Pairing Matrix (解辣黃金指南) */}
        <div className="p-6 rounded-xl bg-[#12100f] border border-[#282422] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d49b55]" />
            <h4 className="font-oriental text-base font-semibold text-[#f5f1ea]">
              主廚特調 · 巴蜀解辣解麻指南
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#aba193]">
            <div className="p-4 rounded-lg bg-[#181514] border border-[#24211f] space-y-1">
              <span className="text-[#c22b22] font-semibold block">重度麻舌感 (漢源青紅花椒)</span>
              <p className="text-[#8c8273]">
                推薦搭配：<strong className="text-[#f5f1ea]">手炒黑糖醪糟白玉豆花</strong>。滑嫩豆花搭配濃醇黑糖蜜能迅速包覆舌尖神經受體，降溫消麻。
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#181514] border border-[#24211f] space-y-1">
              <span className="text-[#c22b22] font-semibold block">牛油油脂黏滯感 (麻辣老火鍋)</span>
              <p className="text-[#8c8273]">
                推薦搭配：<strong className="text-[#f5f1ea]">老樹煙燻桂花陳皮酸梅湯</strong>。天然有機酸分解油脂，生津止渴，讓腸胃毫無積滯負擔。
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#181514] border border-[#24211f] space-y-1">
              <span className="text-[#c22b22] font-semibold block">微醺佐餐情懷 (和牛涮肉)</span>
              <p className="text-[#8c8273]">
                推薦搭配：<strong className="text-[#f5f1ea]">花椒精釀特調IPA</strong>。啤酒花微苦與花椒清香共振，將和牛油脂昇華為甘美香氣。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
