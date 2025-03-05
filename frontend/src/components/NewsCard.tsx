import React from 'react';
import { ExternalLink, Calendar, AlertCircle, Tag } from 'lucide-react';
import { NewsItem } from '../types/news';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC <NewsCardProps> = ({ news }) => {
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Get category color based on category name
  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-100 text-gray-800';
    
    switch(category.toLowerCase()) {
      case 'business':
        return 'bg-emerald-100 text-emerald-800';
      case 'entertainment':
        return 'bg-purple-100 text-purple-800';
      case 'sports':
        return 'bg-red-100 text-red-800';
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'science':
        return 'bg-indigo-100 text-indigo-800';
      case 'politics':
        return 'bg-orange-100 text-orange-800';
      case 'world':
        return 'bg-teal-100 text-teal-800';
      case 'top':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
    <div className="flex flex-col w-[300px] h-[420px] bg-black rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="h-[160px] overflow-hidden bg-gray-200">
        {news.imageUrl ? (
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback image if the provided URL fails to load
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full truncate max-w-[150px]">
            {news.source}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {formattedDate}
          </div>
        </div>
        <h3 className="text-lg font-bold line-clamp-2 mb-2">{news.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-grow">{news.description}</p>
        
        {news.category && (
          <div className="flex items-center mb-3">
            <Tag className="w-3 h-3 mr-1 text-gray-500" />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(news.category)}`}>
              {news.category}
            </span>
          </div>
        )}
        
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-auto"
        >
          Read more <ExternalLink className="ml-1 w-4 h-4" />
        </a>
      </div>
    </div>
    </>
  );
};

export default NewsCard;