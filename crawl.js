const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      urls.push(`${baseURL}${linkElement.href}`);
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const fullURL = `${urlObj.host}${urlObj.pathname}`;
  if (fullURL.length > 0 && fullURL.slice(-1) !== '/') {
    return fullURL;
  }
  return fullURL.slice(0, -1);
}

module.exports = { normalizeURL, getURLsFromHTML };
