import React from 'react';
import { ShoppingBag, Eye, Calendar, Sparkles } from 'lucide-react';
import { AppPage, BlockId } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentPage: AppPage;
  onNavigatePage: (page: AppPage, targetBlock?: BlockId) => void;
  activeBlock: BlockId;
  cartCount: number;
  onOpenCart: () => void;
  onOpenVis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  activeBlock,
  cartCount,
  onOpenCart,
  onOpenVis,
}) => {
  const pages: { id: AppPage; label: string; en: string }[] = [
    { id: 'brand', label: '品牌風尚', en: 'BRAND & SPIRIT' },
    { id: 'menu', label: '珍饈典藏', en: 'MENU & DISHES' },
    { id: 'experience', label: '預約服務', en: 'RESERVE & ORDER' },
  ];

  // 3 Blocks per page for quick jumping
  const blockSubnav: Record<AppPage, { id: BlockId; label: string }[]> = {
    brand: [
      { id: 'brand-hero', label: '01 品牌視覺' },
      { id: 'brand-heritage', label: '02 雙絕工藝' },
      { id: 'brand-space', label: '03 空間意境' },
    ],
    menu: [
      { id: 'menu-broths', label: '01 沸騰水煮魚與鍋底' },
      { id: 'menu-meats', label: '02 頂級涮料與名物' },
      { id: 'menu-drinks', label: '03 解辣甘霖與特釀' },
    ],
    experience: [
      { id: 'exp-booking', label: '01 尊榮線上訂位' },
      { id: 'exp-takeout', label: '02 外帶外送點餐' },
      { id: 'exp-locations', label: '03 席位據點與禮賓' },
    ],
  };

  const handleSubnavClick = (blockId: BlockId) => {
    const el = document.getElementById(blockId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f0e0d]/95 backdrop-blur-md border-b border-[#2d2825]">
      {/* Top Bar: Strict One-Row Three-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark / Emblem Lockup */}
        <div className="flex items-center">
          <BrandLogo
            size="md"
            onClick={() => onNavigatePage('brand', 'brand-hero')}
            className="hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Zone 2: 3 Navigation Links (Text with subtle hover state) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {pages.map((p) => {
            const isActive = currentPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onNavigatePage(p.id)}
                className={`relative py-2 text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#f5f1ea] font-semibold'
                    : 'text-[#9c9183] hover:text-[#f5f1ea]'
                }`}
              >
                <span className="font-oriental text-base mr-1">{p.label}</span>
                <span className="font-latin-display text-[10px] text-[#6d6458] block">
                  {p.en}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c22b22]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-3">
          {/* VIS Button */}
          <button
            onClick={onOpenVis}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#d49b55] hover:text-[#f5f1ea] bg-[#1d1a18] hover:bg-[#2b2623] border border-[#d49b55]/30 rounded transition-all whitespace-nowrap"
            title="開啟視覺識別手冊 (VIS)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c22b22]" />
            <span>品牌 VIS 規範</span>
          </button>

          {/* Quick Reserve CTA */}
          <button
            onClick={() => onNavigatePage('experience', 'exp-booking')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#f5f1ea] bg-[#2a2420] hover:bg-[#38312c] border border-[#443c36] rounded transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#d49b55]" />
            <span>尊榮訂位</span>
          </button>

          {/* Cart / Takeout Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-[#c22b22] hover:bg-[#a9221a] rounded transition-all shadow-md whitespace-nowrap"
            aria-label="查看外帶點餐車"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">外帶點餐</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#f6f4f0] text-[#c22b22] text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-block Navigation Bar (Seamless inter-block connections) */}
      <div className="bg-[#141211] border-t border-[#221f1d] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1.5 text-xs overflow-x-auto">
          {/* Mobile Page Switcher */}
          <div className="flex md:hidden items-center gap-2 pr-3 border-r border-[#2d2825] shrink-0">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigatePage(p.id)}
                className={`px-2 py-1 text-xs rounded ${
                  currentPage === p.id
                    ? 'bg-[#c22b22] text-white'
                    : 'text-[#9c9183] hover:text-[#f5f1ea]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* 3 Blocks of the current page */}
          <div className="flex items-center gap-2 sm:gap-6 shrink-0">
            <span className="text-[11px] font-latin-display text-[#d49b55] tracking-widest hidden sm:inline">
              SECTION CHRONICLE
            </span>
            {blockSubnav[currentPage].map((block) => (
              <button
                key={block.id}
                onClick={() => handleSubnavClick(block.id)}
                className={`py-1 px-2.5 rounded text-xs transition-colors whitespace-nowrap ${
                  activeBlock === block.id
                    ? 'text-[#e13b2e] bg-[#c22b22]/10 font-medium'
                    : 'text-[#8c8273] hover:text-[#e5e0d8]'
                }`}
              >
                {block.label}
              </button>
            ))}
          </div>

          {/* Quick link to other pages */}
          <div className="hidden lg:flex items-center gap-4 text-[#8a8072] text-[11px]">
            <span>
              營業時間：11:30 - 02:00（深夜宵夜席熱烈供應中）
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenVis}
              className="text-[#d49b55] hover:underline"
            >
              檢視東方美學識別手冊
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
