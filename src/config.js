let value = null;
if (false) {
    if(true) value = 'http://127.0.0.1:7000/search-the-news/us-central1';
    else value = 'https://us-central1-search-the-news.cloudfunctions.net'
    
} else {
    console.log('Production');
    value = 'https://us-central1-search-the-news.cloudfunctions.net'
}
export default value;