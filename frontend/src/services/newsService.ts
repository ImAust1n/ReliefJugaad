import { NewsItem } from '../types/news';

// API key and URL for NewsData.io
const API_KEY = 'pub_72676f1c6c8602f3be4ec4b8a27de1378de89';
const API_URL = 'https://newsdata.io/api/1/latest';

// Function to fetch news from NewsData.io API
export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    // Fetch news from India with no specific sentiment filter
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&country=in&language=en`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our NewsItem interface
    return transformNewsData(data.results || []);
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return empty array in case of error
    return [];
  }
};

// Function to fetch updated news
export const fetchUpdatedNews = async (): Promise<NewsItem[]> => {
  // For real updates, we're just calling the same API again
  return fetchNews();
};

// Helper function to transform API data to our format
const transformNewsData = (apiResults: any[]): NewsItem[] => {
  return apiResults.map((item, index) => ({
    id: item.article_id || `news-${index}`,
    title: item.title || 'No title available',
    description: item.description || 'No description available',
    source: item.source_id || 'Unknown Source',
    // Use a default image if none is provided
    imageUrl: item.image_url || 
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    url: item.link || '#',
    publishedAt: item.pubDate || new Date().toISOString(),
    category: item.category?.[0] || 'General'
  }));
};

// Fallback mock data in case the API fails
const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'India Reports Record Economic Growth in Q2',
    description: 'India\'s economy grew at 7.8% in the second quarter, exceeding analyst expectations and positioning the country as the fastest-growing major economy.',
    source: 'Economic Times',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    url: 'https://example.com/news/1',
    publishedAt: '2023-10-15T14:30:00Z',
    category: 'Business'
  },
  {
    id: '2',
    title: 'New Delhi Implements Ambitious Clean Air Initiative',
    description: 'The Delhi government has launched a comprehensive plan to combat air pollution, including vehicle restrictions and industrial emissions controls.',
    source: 'India Today',
    imageUrl: 'https://images.unsplash.com/photo-1513015141805-e9234771dd14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    url: 'https://example.com/news/2',
    publishedAt: '2023-10-14T09:15:00Z',
    category: 'Environment'
  },
  {
    id: '3',
    title: 'Indian Cricket Team Announces Squad for Upcoming Series',
    description: 'The BCCI has announced the Indian cricket team squad for the upcoming series against Australia, with several surprise selections.',
    source: 'Sports Star',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
    url: 'https://example.com/news/3',
    publishedAt: '2023-10-13T11:45:00Z',
    category: 'Sports'
  }
];