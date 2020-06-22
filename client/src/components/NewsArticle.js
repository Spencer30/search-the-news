import React from 'react';

class NewsArticle extends React.Component {
    goToLink = () => {
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
            <div className="item itemCard" onClick={this.goToLink} style={{borderBottom: this.props.darkMode ? 'solid 2px #ccc' : '',}}>
                <div className="image">
                    <img src={this.props.article.urlToImage} alt={this.props.article.title} />
                </div>
                <div className="content">
                    <h3 className="header" style={{color: this.props.darkMode ? 'lightgrey' : ''}}>{this.props.article.title}</h3>
                    <div className="meta">
                        <span style={{color: this.props.darkMode ? 'lightgrey' : ''}}>{this.props.article.description}</span>
                    </div>
                    <div className="description">
                        <p></p>
                    </div>
                    <div className="extra" style={{color: this.props.darkMode ? 'lightgrey' : ''}}>
                        <div >
                            Source: <span className="source">{this.props.article.source.name}</span>
                        </div>
                  Date: {this.formatDate()}
                    </div>
                </div>
            </div>

        );
    }
}

export default NewsArticle;