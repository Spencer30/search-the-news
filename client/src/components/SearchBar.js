import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { term : ''};
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
        this.setState({ term : ''})
    }


    render(){
        return <div className="ui segment">
            <form className="ui form" onSubmit={this.onFormSubmit}>
                <div className="field">
                    <input type="text" placeholder="search for stories" name="search" value={this.state.term} onChange={(e) => {this.setState({ term: e.target.value })}} style={{fontSize:16}}/>
                </div>
            </form>
        </div>
    }
}

export default SearchBar;