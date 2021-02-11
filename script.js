const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote');

// fetch quote from API
const getQuote = async function () {
  const proxyUrl = 'https://secure-headland-34160.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    renderQuote(data);
  } catch (error) {
    // getQuote();
    console.error('unable to fetch quote', error);
  }
};

// render quote
const renderQuote = function (info) {
  info.quoteText.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  quoteText.textContent = info.quoteText;

  quoteAuthor.textContent =
    info.quoteAuthor === '' ? 'Anonymous' : info.quoteAuthor;
};

// open twitter to tweet the quote
const tweetHandler = function () {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetHandler);

getQuote();
