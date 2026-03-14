import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronRight, ChevronDown, Loader2, Filter, X, Grid, List, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productService } from '../Service/productService';
import { formatPrice, getImageUrl } from '../utils';

interface ProductPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([undefined, undefined]);
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { label: 'Sản phẩm mới nhất', value: 'created_at-desc' },
    { label: 'Giá: Tăng dần', value: 'base_price-asc' },
    { label: 'Giá: Giảm dần', value: 'base_price-desc' },
    { label: 'Tên danh mục: A-Z', value: 'name-asc' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === `${sortBy}-${sortOrder}`)?.label || 'Mới nhất hiện hữu';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catRes = await productService.getCategories();
        setCategories(catRes || []);
      } catch (error) {
        console.error('Thất bại khi tải danh mục:', error);
      }
    };
    fetchCats();
  }, []);

  const fetchInitialData = async () => {
    setIsInitialLoading(true);
    try {
      const prodRes = await productService.getProducts({
        category_id: selectedCategory,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: search || undefined,
        min_price: priceRange[0],
        max_price: priceRange[1]
      });
      setProducts(prodRes.data || []);
      setNextCursor(prodRes.next_cursor);
    } catch (error) {
      console.error('Thất bại khi tải sản phẩm:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!nextCursor || isFetchingNextPage) return;

    setIsFetchingNextPage(true);
    try {
      const prodRes = await productService.getProducts({
        cursor: nextCursor,
        category_id: selectedCategory,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: search || undefined,
        min_price: priceRange[0],
        max_price: priceRange[1]
      });
      setProducts(prev => [...prev, ...(prodRes.data || [])]);
      setNextCursor(prodRes.next_cursor);
    } catch (error) {
      console.error('Thất bại khi tải thêm sản phẩm:', error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [selectedCategory, sortBy, sortOrder, search, priceRange]);

  if (isInitialLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <Loader2 className="animate-spin h-12 w-12 text-black mx-auto" />
        <p className="mt-4 text-neutral-500 font-medium font-serif italic text-lg tracking-wide">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="mb-12">
        <nav className="flex items-center gap-2 text-[10px] text-neutral-400 mb-4 uppercase tracking-[0.2em] font-bold">
          <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Trang chủ</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-neutral-900 border-b border-black/20">Sản Phẩm</span>
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-bold text-neutral-900 tracking-tighter"
        >
          Tất cả sản phẩm
        </motion.h1>
      </div>

      {/* Unified Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-y border-neutral-100 py-6 mb-12">
        <div className="flex flex-col gap-8">
          {/* Row 1: Search & Categories */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-6 min-w-max pb-2 lg:pb-0">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`text-[10px] whitespace-nowrap font-black uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${!selectedCategory ? 'text-black border-black' : 'text-neutral-400 border-transparent hover:text-neutral-600'}`}
                >
                  Tất cả
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-[10px] whitespace-nowrap font-black uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${selectedCategory === cat.id ? 'text-black border-black' : 'text-neutral-400 border-transparent hover:text-neutral-600'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-72">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(searchInput);
                }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu thiết kế..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-neutral-50 border-none px-12 py-3 text-xs font-medium focus:ring-1 focus:ring-black transition-all rounded-sm"
                />
                {(searchInput || search) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setSearch('');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Row 2: Price & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Giá:</span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPriceRange([
                      minPriceInput ? Number(minPriceInput) : undefined,
                      maxPriceInput ? Number(maxPriceInput) : undefined
                    ]);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="number"
                    placeholder="Từ"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="bg-neutral-50 border-none px-3 py-2 text-[10px] font-bold focus:ring-1 focus:ring-black w-24"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="bg-neutral-50 border-none px-3 py-2 text-[10px] font-bold focus:ring-1 focus:ring-black w-24"
                  />
                  <button type="submit" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <Filter className="h-3 w-3" />
                  </button>
                </form>
              </div>

              <div className="hidden lg:flex items-center gap-2">
                {[1000000, 5000000, 10000000].map(price => (
                  <button
                    key={price}
                    onClick={() => {
                      setMinPriceInput('');
                      setMaxPriceInput(price.toString());
                      setPriceRange([undefined, price]);
                    }}
                    className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border transition-all ${priceRange[1] === price && !priceRange[0] ? 'bg-black text-white border-black' : 'bg-transparent text-neutral-400 border-neutral-200 hover:border-black hover:text-black'}`}
                  >
                    Dưới {price / 1000000}Tr
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 relative" ref={sortRef}>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Sắp xếp:</span>
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-xs font-black uppercase tracking-widest text-black group-hover:text-black/70 transition-colors">
                      {currentSortLabel}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-black transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white border border-neutral-100 shadow-2xl z-50 overflow-hidden"
                      >
                        <ul className="py-2">
                          {sortOptions.map((option) => (
                            <li key={option.value}>
                              <button
                                onClick={() => {
                                  const [field, order] = option.value.split('-');
                                  setSortBy(field);
                                  setSortOrder(order);
                                  setIsSortOpen(false);
                                }}
                                className={`w-full text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${`${sortBy}-${sortOrder}` === option.value
                                  ? 'bg-black text-white'
                                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                                  }`}
                              >
                                {option.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <p className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 whitespace-nowrap">
                {products.length} Tác phẩm
              </p>
            </div>
          </div>
        </div>
      </div>  

      <div className="w-full">

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20 mb-16">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={`${product.id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: (index % 12) * 0.03 }}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-neutral-50 overflow-hidden relative mb-8 cursor-pointer" onClick={() => onNavigate('detail', product.id)}>
                    <img
                      src={getImageUrl(product.image_url)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Status Overlays */}
                    <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
                      {Boolean(product.sale_price && product.base_price > product.sale_price) && (
                        (() => {
                          const discount = Math.round((1 - product.sale_price / product.base_price) * 100);
                          return discount > 0 ? (
                            <span className="bg-red-600 text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-xl">
                              Giảm — {discount}%
                            </span>
                          ) : null;
                        })()
                      )}
                      {Boolean(product.is_featured) && (
                        <span className="bg-black text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-xl">
                          Đặc Biệt
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 w-[70%]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('detail', product.id);
                        }}
                        className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-2xl"
                      >
                        Khám Phá —
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <h3
                      onClick={() => onNavigate('detail', product.id)}
                      className="text-[13px] font-black text-neutral-900 group-hover:text-black transition-colors cursor-pointer leading-tight uppercase tracking-widest"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-[13px] font-bold text-neutral-900">{formatPrice(product.sale_price || product.base_price)}</p>
                      {product.sale_price && product.base_price > product.sale_price && (
                        <p className="text-[11px] text-neutral-400 line-through font-medium">{formatPrice(product.base_price)}</p>
                      )}
                    </div>
                    {/* Minimal details */}
                    <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">
                      {product.category?.name || 'Exclusive Design'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Button Section */}
          <div className="py-24 flex flex-col items-center justify-center gap-6 min-h-[140px]">
            {nextCursor && !isFetchingNextPage ? (
              <button
                onClick={loadMoreProducts}
                className="group relative px-12 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all hover:bg-neutral-800 shadow-xl"
              >
                <span className="relative z-10">Khám Phá Tiếp —</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            ) : isFetchingNextPage ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin h-10 w-10 text-neutral-200" />
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-400">Đang tải thêm sản phẩm</p>
              </div>
            ) : null}

            {!nextCursor && !isInitialLoading && products.length > 0 && (
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-[1px] bg-neutral-200" />
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-neutral-300">Cạn kho luôn rồi</p>
              </div>
            )}

            {!isInitialLoading && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg font-serif italic text-neutral-500 mb-8 tracking-wide">Không tìm được sản phẩm phù hợp</p>
                <button
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSearchInput('');
                    setSearch('');
                    setMinPriceInput('');
                    setMaxPriceInput('');
                    setPriceRange([undefined, undefined]);
                  }}
                  className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest"
                >
                  Xóa toàn bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};
