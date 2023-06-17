import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnapCarousel } from 'react-snap-carousel';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles.css';

const city = 'miami';
const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=APIKey`;

// eslint-disable-next-line react/prop-types
export default function Headlines({ searchedCity }) {
  // const city = 'miami';
  // const url = `https://newsapi.org/v2/everything?q=${searchedCity}&apiKey=APIKEY`;
  const [articles, setArticles] = useState([]);
  const { scrollRef } = useSnapCarousel();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // Process the data returned by the API
        const data = response.data;
        setArticles(data.articles);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="news-section">
      <div className="headlines">
        <ul
          ref={scrollRef}
          style={{
            display: 'flex',
            overflow: 'auto',
            scrollSnapType: 'x mandatory'
          }}>
          {articles.slice(0, 10).map((article, index) => (
            <li
              key={index}
              style={{
                fontSize: '50px',
                width: '250px',
                flexShrink: 0,
                color: '#fff',
                display: 'flex',
                justifyContent: 'top',
                alignItems: 'top'
              }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image={article.urlToImage} />
                <CardContent>
                  <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" target="blank" href={article.url} rel="noopener noreferrer">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
