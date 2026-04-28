import React, { useState, useEffect } from 'react';
import API_KEY from './config';
import './MarketNews.css';

const MarketNews = ({ asset }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${asset}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news. Please check your API key.');
        }
        const data = await response.json();
        setNews(data.results || []);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchNews();
  }, [asset]);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="market-news">
      {news.length > 0 ? (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news found for {asset}.</p>
      )}
    </div>
  );
};

export default MarketNews;
