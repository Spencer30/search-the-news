import React from 'react';
import NewsArticle from './NewsArticle';

const NewsContainer= (props) => {
    const news = props.newsArticles.map((article, index) => {
        return <NewsArticle key={index} article={article} darkMode={props.darkMode}/>
    })

   return(
       <div className="ui divided items">
          {news.sort((a,b) => (a.props.article.publishedAt < b.props.article.publishedAt) ? 1 : -1)}
       </div>
   );
}

export default NewsContainer;