import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { AppPage, BlockId } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigatePage: (page: AppPage, targetBlock?: BlockId) => void;
  onOpenVis: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenVis,
}) => {
  return (
    <footer className="bg-[#0b0a09] border-t border-[#24201e] text-[#9c9183] text-xs pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1f1c1a]">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="md" showSeal={true} />
            <p className="text-xs text-[#807669] leading-relaxed">
              當代東方麻辣火鍋與活魚沸騰料理旗艦。嚴選四川漢源貢椒與非遺古法老茶油，以沉浸式東方極致美學，淬鍊川魂極致之味。
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenVis}
                className="inline-flex items-center gap-1.5 text-xs text-[#d49b55] hover:text-[#f5f1ea] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c22b22]" />
                <span>檢視品牌 VIS 視覺識別系統</span>
              </button>
            </div>
          </div>

          {/* Page 1 Block Links */}
          <div className="space-y-2">
            <div className="font-oriental font-semibold text-sm text-[#f5f1ea] pb-1 border-b border-[#201d1b]">
              品牌風尚 Brand
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigatePage('brand', 'brand-hero')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  01. 品牌視覺與川魂理念
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('brand', 'brand-heritage')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  02. 雙絕工藝：老火鍋 × 水煮魚
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('brand', 'brand-space')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  03. 東方空間美學與私人包廂
                </button>
              </li>
            </ul>
          </div>

          {/* Page 2 Block Links */}
          <div className="space-y-2">
            <div className="font-oriental font-semibold text-sm text-[#f5f1ea] pb-1 border-b border-[#201d1b]">
              珍饈典藏 Menu
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigatePage('menu', 'menu-broths')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  01. 漢源貢椒沸騰魚與古法鍋底
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('menu', 'menu-meats')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  02. 日本A5和牛與冷鏈直運鮮毛肚
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('menu', 'menu-drinks')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  03. 手炒黑糖白玉豆花與特釀桂花酸梅湯
                </button>
              </li>
            </ul>
          </div>

          {/* Page 3 Block Links & Hours */}
          <div className="space-y-2">
            <div className="font-oriental font-semibold text-sm text-[#f5f1ea] pb-1 border-b border-[#201d1b]">
              預約與服務 Services
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigatePage('experience', 'exp-booking')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  01. 席位尊榮即時預約
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('experience', 'exp-takeout')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  02. 雙重保溫外帶外送點餐
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('experience', 'exp-locations')}
                  className="hover:text-[#f5f1ea] transition-colors text-left"
                >
                  03. 市區靜巷旗艦店 / 概念西門店據點
                </button>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#786e61] space-y-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#d49b55]" />
                <span>每日 11:30 - 02:00（深夜宵夜供應）</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6d6356]">
          <div>
            © 2026 華神·椒麻 極致饗宴. 保留一切權利。
          </div>
        </div>
      </div>
    </footer>
  );
};
