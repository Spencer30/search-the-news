import React from 'react';
import './App.css';
import Title from './components/Title'
import SearchBar from './components/SearchBar';

class App extends React.Component {
  state = { news: [] }

  render() {
    return (
      <div className="appContainer">
        <div className="ui left vertical menu">Weather Card</div>
        <div className="ui container" >
          <div className="fixSearch">
            <Title />
            <p className="powered">(Powered By NewsApi)</p>
            <SearchBar />
          </div>
      </div>
      </div>
    );
  }
}

export default App;
