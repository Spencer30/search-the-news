import React from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title'
import SearchBar from './components/SearchBar';
import NewsContainer from './components/NewsContainer'
import WeatherCard from './components/WeatherCard';
import StockCard from './components/StockCard';

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
        <div className="ui left vertical menu cardLeft"><WeatherCard /></div>
        <div className="ui container" >
          <div className="fixSearch">
            <Title />
            <p className="powered">(Powered By NewsApi)</p>
            <SearchBar onSubmit={this.onSearchSubmit} />
          </div>
          <div className="mobileContainer">
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><WeatherCard /></div>
            <br></br>
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><StockCard /></div>
            <button onClick={this.showWidgets} className="widgetBtn" style={{ display: this.state.widgets ? 'none' : 'block' }}>Show Widgets</button>
          </div>
          <NewsContainer newsArticles={this.state.news} />
        </div>

        <div className="ui right vertical menu cardRight"><StockCard /></div>
      </div>
    );
  }
}

export default App;