import React from 'react';
import './App.css';
import axios from 'axios';
import Title from './components/Title'
import SearchBar from './components/SearchBar';
import NewsContainer from './components/NewsContainer'
import WeatherCard from './components/WeatherCard';
import StockCard from './components/StockCard';
import LightDarkButton from './components/LightDarkButton';
import NewsArticlePopUp from './components/NewsArticlePopUp';

class App extends React.Component {
  state = { news: [], widgets: true, darkMode: false, articleDisplay: false }
  showWidgets = (pre) => {
    console.log(pre)
    this.setState({ widgets: !pre.widgets });
  }

  componentDidMount(){
    const hours = new Date().getHours();
    if(hours <= 5 || hours >= 19){
      this.setState({darkMode:true})
    } else {
      this.setState({darkMode:false})
    }
  }

  onSearchSubmit = term => {
    axios.get('/news', {
      params: { q: term }
    }).then(response => {
      const newsWithOutId = response.data.articles;
      let idNum = 0;
      for(let i=0; i<newsWithOutId.length; i++){
          newsWithOutId[i].id = idNum + 1
          idNum++
      }
      this.setState({ news: newsWithOutId, widgets: false });
    }).catch(err => {
      console.log(err);
    })
  }

  handleDarkMode = () => {
    let mode = this.state.darkMode;
    this.setState({ darkMode: !mode })
  }

  articleClick = e => {
    let clickID = Number(e.target.id);
    let article = this.state.news.filter(article => article.id === clickID);
    console.log(article[0])
  }

  render() {
    return (
      <div className="appContainer" style={{ backgroundColor: this.state.darkMode ? '#121212' : 'white', height: this.state.news.length === 0 ? '100vh' : '100%' }}>
        <div style={{ position: 'fixed', top: 10, right: 15 }}><LightDarkButton darkMode={this.state.darkMode} onClick={this.handleDarkMode} /></div>
        <div className="ui left vertical menu cardLeft"><WeatherCard darkMode={this.state.darkMode} /></div>
        <div style={{ display: this.state.articleDisplay ? 'block' : 'none' }}><NewsArticlePopUp /></div>

        <div className="ui container" style={{ backgroundColor: this.state.darkMode ? '#121212' : 'white' }}>
          <div className="fixSearch" style={{ backgroundColor: this.state.darkMode ? '#121212' : 'white' }}>
            <Title />
            <p className="powered" style={{ color: this.state.darkMode ? '#888' : 'rgba()' }}>(Powered By NewsApi)</p>
            <SearchBar onSubmit={this.onSearchSubmit} darkMode={this.state.darkMode} />
          </div>
          <div className="mobileContainer">
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><WeatherCard darkMode={this.state.darkMode} /></div>
            <br></br>
            <div style={{ display: this.state.widgets ? 'block' : 'none' }} className="cardW"><StockCard darkMode={this.state.darkMode} /></div>
            <button onClick={this.showWidgets} className="widgetBtn" style={{ display: this.state.widgets ? 'none' : 'block' }}>Show Widgets</button>
          </div>
          <NewsContainer newsArticles={this.state.news} darkMode={this.state.darkMode} clickArticle={this.articleClick}/>
        </div>
        <div className="ui right vertical menu cardRight"><StockCard darkMode={this.state.darkMode} /></div>
      </div>
    );
  }
}

export default App;