import React, { useState, useEffect } from 'react';
import { AppPage, BlockId, CartItem, MenuItem, ReservationState } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VisModal } from './components/VisModal';
import { CartDrawer } from './components/CartDrawer';
import { BrandPage } from './pages/BrandPage';
import { MenuPage } from './pages/MenuPage';
import { ExperiencePage } from './pages/ExperiencePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('brand');
  const [activeBlock, setActiveBlock] = useState<BlockId>('brand-hero');
  const [isVisOpen, setIsVisOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Reservation state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const [reservationState, setReservationState] = useState<ReservationState>({
    date: tomorrowString,
    timeSlot: '18:30',
    guests: 4,
    seatingType: 'window',
    name: '',
    phone: '',
    email: '',
    spiceTolerance: '正宗巴蜀',
    specialRequests: '',
    preSelectedPot: '漢源貢椒沸騰現片黑魚 (NT$ 1,880)',
    confirmed: false,
    bookingCode: '',
  });

  // Track scroll position to update active block indicator
  useEffect(() => {
    const handleScroll = () => {
      const blockIds: BlockId[] =
        currentPage === 'brand'
          ? ['brand-hero', 'brand-heritage', 'brand-space']
          : currentPage === 'menu'
          ? ['menu-broths', 'menu-meats', 'menu-drinks']
          : ['exp-booking', 'exp-takeout', 'exp-locations'];

      const scrollPosition = window.scrollY + 200;

      for (let i = blockIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(blockIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveBlock(blockIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Navigate page with optional scroll target
  const handleNavigatePage = (page: AppPage, targetBlock?: BlockId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetBlock) {
      setTimeout(() => {
        const el = document.getElementById(targetBlock);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveBlock(targetBlock);
        }
      }, 100);
    } else {
      const defaultBlocks: Record<AppPage, BlockId> = {
        brand: 'brand-hero',
        menu: 'menu-broths',
        experience: 'exp-booking',
      };
      setActiveBlock(defaultBlocks[page]);
    }
  };

  // Add to cart handler
  const handleAddToCart = (item: MenuItem, spiciness: string, numbing: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (ci) => ci.item.id === item.id && ci.spiciness === spiciness && ci.numbing === numbing
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          item,
          quantity: 1,
          spiciness,
          numbing,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateReservation = (updates: Partial<ReservationState>) => {
    setReservationState((prev) => ({ ...prev, ...updates }));
  };

  const handleConfirmReservation = () => {
    const bookingCode = `CX-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationState((prev) => ({
      ...prev,
      confirmed: true,
      bookingCode,
    }));
  };

  const handlePreSelectRoom = (roomType: 'hall' | 'window' | 'vip') => {
    setReservationState((prev) => ({
      ...prev,
      seatingType: roomType,
      confirmed: false,
    }));
  };

  const handlePreSelectPotInBooking = (potName: string) => {
    setReservationState((prev) => ({
      ...prev,
      preSelectedPot: potName,
      confirmed: false,
    }));
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#e5e0d8] flex flex-col selection:bg-[#c22b22] selection:text-white bg-lattice">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        activeBlock={activeBlock}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVis={() => setIsVisOpen(true)}
      />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {currentPage === 'brand' && (
          <BrandPage
            onNavigatePage={handleNavigatePage}
            onOpenVis={() => setIsVisOpen(true)}
            onPreSelectReservation={handlePreSelectRoom}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            onAddToCart={handleAddToCart}
            onNavigatePage={handleNavigatePage}
            onPreSelectPotInBooking={handlePreSelectPotInBooking}
          />
        )}

        {currentPage === 'experience' && (
          <ExperiencePage
            reservationState={reservationState}
            onUpdateReservation={handleUpdateReservation}
            onConfirmReservation={handleConfirmReservation}
            onOpenCart={() => setIsCartOpen(true)}
            onNavigatePage={handleNavigatePage}
          />
        )}
      </main>

      {/* Visual Identity System (VIS) Modal */}
      <VisModal isOpen={isVisOpen} onClose={() => setIsVisOpen(false)} />

      {/* Takeout & Delivery Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onGoToMenu={() => handleNavigatePage('menu', 'menu-broths')}
      />

      {/* Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenVis={() => setIsVisOpen(true)}
      />
    </div>
  );
}
