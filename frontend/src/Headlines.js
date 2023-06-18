/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles.css';

export default function Headlines({ newsData, city }) {
  return (
    <div className="news-page">
      <h1 className="news-title">News in {city}</h1>
      <div className="news-section">
        <div
          className="headlines"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {newsData.newsData.articles.slice(0, 9).map((article, index) => (
            <div key={index} style={{ margin: '15px' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="" height="140" image={article.urlToImage} />
                <CardContent className="card-body">
                  <Typography
                    className="article-title"
                    gutterBottom
                    color="text.secondary"
                    component="div"
                    style={{ fontSize: '18px', fontFamily: 'Montserrat, sans-serif' }}>
                    {article.title}
                  </Typography>
                  <Typography
                    className="article-description"
                    variant="body2"
                    color="text.secondary"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {article.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    target="blank"
                    href={article.url}
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#0079D5' }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
