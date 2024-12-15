const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const categorySelect = document.getElementById('category-select');

const predefinedQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "Opportunities don't happen, you create them.", author: "Chris Grosser" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

async function fetchQuote(category = '') {
  let url = 'https://api.quotable.io/random';
  if (category) {
    url = `https://api.quotable.io/random?tags=${category}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `– ${data.author}`;
  } catch (error) {
    const randomQuote = predefinedQuotes[Math.floor(Math.random() * predefinedQuotes.length)];
    quoteText.textContent = `"${randomQuote.text}"`;
    authorText.textContent = `– ${randomQuote.author}`;
  }
}

newQuoteBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  fetchQuote(category);
});

copyBtn.addEventListener('click', () => {
  const quote = quoteText.textContent + ' ' + authorText.textContent;
  navigator.clipboard.writeText(quote).then(() => {
    alert('Quote copied to clipboard!');
  });
});

shareBtn.addEventListener('click', () => {
  const quote = quoteText.textContent + ' ' + authorText.textContent;
  const shareText = encodeURIComponent(quote);
  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  window.open(shareUrl, '_blank');
});

window.onload = () => fetchQuote();

categorySelect.addEventListener('change', (e) => {
  fetchQuote(e.target.value);
});
