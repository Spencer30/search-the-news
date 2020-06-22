import React from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title'
import SearchBar from './components/SearchBar';
import NewsContainer from './components/NewsContainer'
import WeatherCard from './components/WeatherCard';
import StockCard from './components/StockCard';
import LightDarkButton from './components/LightDarkButton';

class App extends React.Component {
  state = { news: [], widgets: true, darkMode: false }
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

  handleDarkMode = () => {
    let mode = this.state.darkMode;
    this.setState({darkMode:!mode})
  }

  render() {
    return (
      <div className="appContainer" style={{backgroundColor:this.state.darkMode ? '#121212' : 'white', height: this.state.news.length === 0 ? '100vh' : '100%'}}>
        <div style={{position:'absolute', top: 10, right: 15}}><LightDarkButton darkMode={this.state.darkMode} onClick={this.handleDarkMode}/></div> 
        <div className="ui left vertical menu cardLeft"><WeatherCard darkMode={this.state.darkMode}/></div>
        <div className="ui container" style={{backgroundColor:this.state.darkMode ? '#121212' : 'white'}}>
          <div className="fixSearch" style={{backgroundColor:this.state.darkMode ? '#121212' : 'white'}}>
            <Title />
            <p className="powered" style={{color:this.state.darkMode ? '#888' : 'rgba()'}}>(Powered By NewsApi)</p>
            <SearchBar onSubmit={this.onSearchSubmit} darkMode={this.state.darkMode} />
          </div>
          <div className="mobileContainer">
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><WeatherCard darkMode={this.state.darkMode}/></div>
            <br></br>
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><StockCard darkMode={this.state.darkMode}/></div>
            <button onClick={this.showWidgets} className="widgetBtn" style={{ display: this.state.widgets ? 'none' : 'block' }}>Show Widgets</button>
          </div>
          <NewsContainer newsArticles={this.state.news} darkMode={this.state.darkMode}/>
        </div>

        <div className="ui right vertical menu cardRight"><StockCard darkMode={this.state.darkMode}/></div>
      </div>
    );
  }
}

export default App;