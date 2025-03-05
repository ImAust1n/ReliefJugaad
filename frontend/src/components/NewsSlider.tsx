import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';
import { NewsItem } from '../types/news';

interface NewsSliderProps {
  news: NewsItem[];
  isLoading: boolean;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ news, isLoading }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  // Check if arrows should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (!sliderRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    };

    // Initial check
    checkScroll();
    
    // Add scroll event listener
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
      return () => slider.removeEventListener('scroll', checkScroll);
    }
  }, [news]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = 320; // card width + gap
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[420px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}
      
      <div 
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto py-4 px-10 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className="flex-shrink-0 snap-start">
              <NewsCard news={item} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-[420px] text-gray-500">
            No news articles available
          </div>
        )}
      </div>
      
      {showRightArrow && news.length > 0 && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default NewsSlider;