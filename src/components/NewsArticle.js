import React from 'react';

class NewsArticle extends React.Component {
    goToLink = (e) => {
        window.open(this.props.article.url);
    }

    formatDate = () => {
        let oldDate = this.props.article.publishedAt;
        let index = oldDate.indexOf('T');
        let newdate = oldDate.slice(0, index);
        return newdate;
    }

    render() {
        return (
            <div id={ this.props.id } className="item itemCard" onClick={this.goToLink} style={{borderBottom: this.props.darkMode ? 'solid 2px #ccc' : '',}}>
                <div className="image" id={ this.props.id }>
                    <img src={this.props.article.urlToImage} alt={this.props.article.title} id={ this.props.id } />
                </div>
                <div className="content" id={ this.props.id }>
                    <h3 id={ this.props.id } className="header" style={{color: this.props.darkMode ? 'lightgrey' : ''}}>{this.props.article.title}</h3>
                    <div className="meta" id={ this.props.id }>
                        <span id={ this.props.id } style={{color: this.props.darkMode ? 'lightgrey' : ''}}>{this.props.article.description}</span>
                    </div>
                    <div className="description" id={ this.props.id }>
                        <p></p>
                    </div>
                    <div id={ this.props.id } className="extra" style={{color: this.props.darkMode ? 'lightgrey' : ''}}>
                        <div id={ this.props.id }>
                            Source: <span id={ this.props.id } className="source">{this.props.article.source.name}</span>
                        </div>
                  Date: {this.formatDate()}
                    </div>
                </div>
            </div>

        );
    }
}

export default NewsArticle;