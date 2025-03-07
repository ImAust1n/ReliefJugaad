import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter } from 'lucide-react';
import NewsSlider from '../components/NewsSlider';
import { fetchNews, fetchUpdatedNews } from '../services/newsService';
import { NewsItem, NewsCategory } from '../types/news';

function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const categories: NewsCategory[] = [
    'All','Environment'
  ];

  // Initial news fetch
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const newsData = await fetchNews();
        if (newsData.length === 0) {
          setError("No news articles found. Please try again later.");
        } else {
          setNews(newsData);
          setFilteredNews(newsData);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError("Failed to load news. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  // Filter news when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(item => 
        item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredNews(filtered.length > 0 ? filtered : news);
    }
  }, [selectedCategory, news]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const refreshInterval = setInterval(async () => {
      try {
        setIsRefreshing(true);
        setError(null);
        const updatedNews = await fetchUpdatedNews();
        if (updatedNews.length > 0) {
          setNews(updatedNews);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('Error refreshing news:', error);
        // Don't show error on auto-refresh to avoid disrupting the user experience
      } finally {
        setIsRefreshing(false);
      }
    }, 60000); // Refresh every minute

    return () => clearInterval(refreshInterval);
  }, [autoRefresh]);

  // Manual refresh handler
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    setError(null);
    try {
      const updatedNews = await fetchUpdatedNews();
      if (updatedNews.length === 0) {
        setError("No news articles found. Please try again later.");
      } else {
        setNews(updatedNews);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
      setError("Failed to refresh news. Please check your connection and try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-[#112221] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white">Live News Alerts</h1>
              <div className="ml-3 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Real-time
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="flex items-center gap-2">
                <label htmlFor="autoRefresh" className="text-sm text-gray-200">
                  Auto-refresh
                </label>
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
        </header>
        
        <main>
          <NewsSlider news={filteredNews} isLoading={isLoading} />
          
          {filteredNews.length === 0 && !isLoading && (
            <div className="text-center py-10">
              <p className="text-gray-500">No news articles found for the selected category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All News
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default News;