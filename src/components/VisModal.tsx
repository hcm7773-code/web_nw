import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, Compass, Palette, Type, Layers, Download } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface VisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisModal: React.FC<VisModalProps> = ({ isOpen, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'logo' | 'colors' | 'type' | 'applications'>('logo');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const brandColors = [
    {
      name: '赤焰硃砂紅 (Crimson Flame)',
      hex: '#C22B22',
      cmyk: 'C:15 M:95 Y:90 K:5',
      role: '主品牌識別色 · 熱油現潑辣椒之魂',
      description: '取自二荊條乾椒經220°C純牛油滾沸後釋放之澄紅光澤，代表極致香辣與東方盛宴之熱度。',
      accent: 'border-l-4 border-[#C22B22]',
    },
    {
      name: '椒金鍛銅 (Spiced Copper)',
      hex: '#D49B55',
      cmyk: 'C:20 M:45 Y:80 K:5',
      role: '東方雅緻輔色 · 老火鍋銅鼎與貢椒烘焙香',
      description: '象徵百年純銅鼎器與四川漢源花椒低溫烘焙後的金黃油亮，散發內斂溫潤的貴族東方質地。',
      accent: 'border-l-4 border-[#D49B55]',
    },
    {
      name: '曜石炭墨黑 (Obsidian Charcoal)',
      hex: '#0F0E0D',
      cmyk: 'C:75 M:70 Y:65 K:85',
      role: '主基底底色 · 玄武青磚與深邃火光空間',
      description: '東方玄度之美，襯托沸騰紅湯與騰躍魚肉的視覺對比，營造沉穩、高隱密且具溫度的餐飲場域。',
      accent: 'border-l-4 border-[#2A2724]',
    },
    {
      name: '貢椒碧玉綠 (Tribute Green Peppercorn)',
      hex: '#4F7344',
      cmyk: 'C:60 M:20 Y:80 K:30',
      role: '功能與點綴色 · 金陽清花椒鮮嫩香氣',
      description: '取自清晨採摘的新鮮金陽青花椒與野山椒，象徵水煮魚鮮脆麻爽與草木生機，帶來解膩清涼感。',
      accent: 'border-l-4 border-[#4F7344]',
    },
    {
      name: '熟宣絲帛白 (Parchment Silk White)',
      hex: '#F6F4F0',
      cmyk: 'C:2 M:3 Y:5 K:0',
      role: '留白與文字基底 · 蒸騰白霧與嫩滑魚片',
      description: '溫潤未漂白的高級手工宣紙色調，象徵新鮮山泉烏魚片劃過高湯時的溫潤白嫩與湯氣氳氳。',
      accent: 'border-l-4 border-[#E5E0D8]',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#141211] border border-[#d49b55]/30 rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#e5e0d8]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2825] bg-[#181614]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c22b22] animate-pulse" />
            <div>
              <h2 className="text-lg font-oriental font-bold tracking-wider text-[#f5f1ea]">
                華神·椒麻 極致饗宴 VIS 品牌視覺識別手冊
              </h2>
              <p className="text-xs text-[#9d9385] font-latin-display">
                VISUAL IDENTITY SYSTEM & BRAND DESIGN CONSTITUTION
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9d9385] hover:text-[#f5f1ea] hover:bg-[#252220] rounded-lg transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#262220] bg-[#11100f] overflow-x-auto">
          {[
            { id: 'logo', label: '01 標誌造型哲學', icon: Compass },
            { id: 'colors', label: '02 色彩規範矩陣', icon: Palette },
            { id: 'type', label: '03 東方文字排版', icon: Type },
            { id: 'applications', label: '04 菜單與器物延展', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#c22b22] text-[#f5f1ea] bg-[#1c1917]'
                    : 'border-transparent text-[#8f8577] hover:text-[#c22b22]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c22b22]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: LOGO DESIGN PHILOSOPHY */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div className="p-8 rounded-lg bg-gradient-to-b from-[#1c1816] to-[#121110] border border-[#d49b55]/20 flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-[#0a0908] rounded-full border border-[#d49b55]/40 mb-4">
                  <BrandLogo size="xl" showSeal={true} showSubtitle={true} />
                </div>
                <div className="inline-block mt-3 px-3 py-1 bg-[#c22b22]/15 border border-[#c22b22]/40 rounded text-xs text-[#e13b2e] font-oriental">
                  標誌構造核心：太極雙生 · 魚火沸騰 · 鼎立九宮
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#181614] border border-[#2b2623]">
                  <h4 className="font-oriental text-sm text-[#d49b55] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c22b22]"></span>
                    赤焰騰魚紋 (Fish & Flame)
                  </h4>
                  <p className="text-xs text-[#aba193] leading-relaxed">
                    以東方太極雙生動態，融合水煮魚躍水之姿與麻辣火鍋上升火焰。上乘為二荊條焰形，下承為流水波浪，象徵水火交融的巴蜀烹飪極致。
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#181614] border border-[#2b2623]">
                  <h4 className="font-oriental text-sm text-[#d49b55] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c22b22]"></span>
                    九宮同心圓 (Cauldron & Ring)
                  </h4>
                  <p className="text-xs text-[#aba193] leading-relaxed">
                    外圍環飾取自重慶老茶油銅鼎，以古法鏤刻斷線排列，象徵鼎沸開席、各司其溫的火鍋圍坐情懷與圓融聚會。
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#181614] border border-[#2b2623]">
                  <h4 className="font-oriental text-sm text-[#d49b55] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c22b22]"></span>
                    硃砂私印 (Cinnabar Seal)
                  </h4>
                  <p className="text-xs text-[#aba193] leading-relaxed">
                    右下角蓋印小篆「華」字私章，如名廚簽名落款，宣告對於漢源貢椒與非遺老茶油配方不妥協之職人底氣。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COLOR SYSTEM */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div className="text-xs text-[#9d9385] pb-1 border-b border-[#2b2623] flex items-center justify-between">
                <span>點擊色票可直接複製 HEX 碼</span>
                <span className="font-latin-display">STANDARDIZED COLOR MATRIX</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {brandColors.map((c) => (
                  <div
                    key={c.hex}
                    className={`p-4 rounded-lg bg-[#181614] border border-[#2b2623] ${c.accent} flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#d49b55]/40 transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-lg shadow-inner shrink-0 border border-white/10 flex items-center justify-center font-mono text-xs font-bold"
                        style={{ backgroundColor: c.hex, color: c.hex === '#F6F4F0' ? '#121110' : '#ffffff' }}
                      >
                        {c.hex}
                      </div>
                      <div>
                        <div className="font-oriental font-semibold text-sm text-[#f5f1ea]">{c.name}</div>
                        <div className="text-xs text-[#d49b55] font-medium">{c.role}</div>
                        <div className="text-xs text-[#9d9385] mt-1 max-w-xl">{c.description}</div>
                      </div>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-[#807669]">{c.cmyk}</span>
                      <button
                        onClick={() => handleCopy(c.hex)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#252220] hover:bg-[#322d2a] text-xs font-mono rounded transition-colors text-[#e5e0d8]"
                      >
                        {copiedColor === c.hex ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#9d9385]" />
                            <span>{c.hex}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY HIERARCHY */}
          {activeTab === 'type' && (
            <div className="space-y-6">
              <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] space-y-4">
                <div className="text-xs text-[#d49b55] font-latin-display tracking-widest uppercase">
                  PRIMARY DISPLAY FONT · 東方標題字型
                </div>
                <div className="font-oriental text-3xl font-bold text-[#f5f1ea] tracking-widest border-b border-[#2b2623] pb-3">
                  川蜀精髓 · 雙絕並立 · 鮮椒騰浪 · 九宮問鼎
                </div>
                <p className="text-xs text-[#9d9385]">
                  採用 <strong className="text-[#f5f1ea]">Noto Serif TC（思源宋體）</strong> 搭配金石刻書筆韻。橫細豎粗，橫筆收尖如刀，筆鋒剛勁而收斂，兼具大氣古韻與當代精準結構。
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] space-y-4">
                <div className="text-xs text-[#d49b55] font-latin-display tracking-widest uppercase">
                  LATIN ACCENT & NUMERALS · 西文與價格刻印
                </div>
                <div className="font-latin-display text-2xl font-bold tracking-widest text-[#d49b55] border-b border-[#2b2623] pb-3">
                  HUASHEN SICHUAN CUISINE · EST. 2026 · NT$ 1,880
                </div>
                <p className="text-xs text-[#9d9385]">
                  採用 <strong className="text-[#f5f1ea]">Cinzel Serif</strong>。源於古羅馬金石銘文的端正比例，結合清晰的等寬數值（Tabular Numerals），為菜單定價與品牌副標賦予低調奢華的權威感。
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] space-y-4">
                <div className="text-xs text-[#d49b55] font-latin-display tracking-widest uppercase">
                  BODY READABILITY · 正文與食材說明
                </div>
                <div className="text-sm text-[#d5cfc5] leading-relaxed border-b border-[#2b2623] pb-3">
                  「一鍋紅湯，半生川味；活魚過沸油，麻香入骨髓。」正文採用高透光率現代黑體，行高設置為 1.6–1.7，在深色沈浸式背景中保持最佳閱讀舒適度。
                </div>
                <p className="text-xs text-[#9d9385]">
                  採用 <strong className="text-[#f5f1ea]">Plus Jakarta Sans</strong> 結合繁體黑體，確保在行動端與菜單點餐時資訊傳遞精準迅速。
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND APPLICATIONS & PACKAGING */}
          {activeTab === 'applications' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Application 1 */}
                <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#d49b55]">APP 01 · 菜單裝幀與印信</span>
                    <h4 className="font-oriental text-base text-[#f5f1ea] mt-1 mb-2">
                      赤金燙印厚卡菜單
                    </h4>
                    <p className="text-xs text-[#9d9385] leading-relaxed">
                      採用450磅深墨色棉絲卡紙，封面採用熱燙消光古銅金箔與凹凸壓印「赤焰騰魚」紋，翻頁時微聞天然花椒木乾燥淡香。
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-[#0d0c0b] rounded border border-[#252220] flex items-center justify-between text-xs">
                    <span className="text-[#c22b22] font-oriental">● 規格：16 開本折頁</span>
                    <span className="text-[#887f73]">內附防油霧透光紙</span>
                  </div>
                </div>

                {/* Application 2 */}
                <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#d49b55]">APP 02 · 外帶點餐防漏禮盒</span>
                    <h4 className="font-oriental text-base text-[#f5f1ea] mt-1 mb-2">
                      雙重保溫鎖鮮紅油提袋
                    </h4>
                    <p className="text-xs text-[#9d9385] leading-relaxed">
                      外層為沉香黑厚磅無氯牛皮紙，內襯食品級鋁箔保溫層。附贈紅印封籤與客製不鏽鋼防漏鎖扣，確保沸騰魚熱油與老茶油鍋底原汁直送。
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-[#0d0c0b] rounded border border-[#252220] flex items-center justify-between text-xs">
                    <span className="text-[#c22b22] font-oriental">● 恆溫保溫 70°C / 60分鐘</span>
                    <span className="text-[#887f73]">專屬封口號碼簽</span>
                  </div>
                </div>

                {/* Application 3 */}
                <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#d49b55]">APP 03 · 專屬鑄銅老火鍋</span>
                    <h4 className="font-oriental text-base text-[#f5f1ea] mt-1 mb-2">
                      手工敲花厚紫銅火鍋
                    </h4>
                    <p className="text-xs text-[#9d9385] leading-relaxed">
                      由川西匠人手工捶打三千錘而成，純紫銅導熱均勻迅速，鼎身銘刻華神水波紋，鼎器可依涮煮食材厚薄自由升降導熱。
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-[#0d0c0b] rounded border border-[#252220] flex items-center justify-between text-xs">
                    <span className="text-[#c22b22] font-oriental">● 導熱率提升 38%</span>
                    <span className="text-[#887f73]">一鼎一編號</span>
                  </div>
                </div>

                {/* Application 4 */}
                <div className="p-5 rounded-lg bg-[#181614] border border-[#2b2623] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#d49b55]">APP 04 · VIP 會員私享信物</span>
                    <h4 className="font-oriental text-base text-[#f5f1ea] mt-1 mb-2">
                      華神椒金銅鑄名牌
                    </h4>
                    <p className="text-xs text-[#9d9385] leading-relaxed">
                      為常客與包廂尊客量身刻製的黑胡桃木與鍛銅名牌，憑卡到店由主廚親自備置隱藏版季節山珍與特調青花椒醬。
                    </p>
                  </div>
                  <div className="mt-4 p-3 bg-[#0d0c0b] rounded border border-[#252220] flex items-center justify-between text-xs">
                    <span className="text-[#c22b22] font-oriental">● 包廂優先預約</span>
                    <span className="text-[#887f73]">免收開瓶與鍋底費</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#262220] bg-[#141211] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8e8477]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d49b55]" />
            <span>華神·椒麻 極致饗宴 · 全套視覺識別與現代東方美學版權所有</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/standalone-index.html"
              download="index.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25201c] hover:bg-[#352e28] text-[#d49b55] hover:text-white border border-[#d49b55]/30 rounded transition-colors font-medium whitespace-nowrap"
              title="下載單一獨立 index.html 檔案"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 index.html (單一檔案)</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#c22b22] hover:bg-[#a9221a] text-white rounded transition-colors font-medium whitespace-nowrap"
            >
              關閉手冊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
