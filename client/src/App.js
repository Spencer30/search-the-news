import React from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title'
import SearchBar from './components/SearchBar';
import NewsContainer from './components/NewsContainer'
import WeatherCard from './components/WeatherCard';

class App extends React.Component {
  state = { news: [], widgets: true }
  showWidgets = (pre) => {
    console.log(pre)
    this.setState({ widgets: !pre.widgets });
  }

  onSearchSubmit = term => {
    axios.get('/news', {
      params: { q: term }
    }).then(response => {
      this.setState({ news: response.data.articles, widgets: false });
    }).catch(err => {
      console.log(err);
    })

  }

  render() {
    return (
      <div className="appContainer">
        <div className="ui left vertical menu"><WeatherCard /></div>
        <div className="ui container" >
          <div className="fixSearch">
            <Title />
            <p className="powered">(Powered By NewsApi)</p>
            <SearchBar onSubmit={this.onSearchSubmit} />
          </div>
          
          <NewsContainer newsArticles={this.state.news} />
        </div>

        <div className="ui right vertical menu">Stock Card</div>
      </div>
    );
  }
}

export default App;
