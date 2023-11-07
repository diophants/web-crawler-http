const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);
  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentURL}`
      );
      return;
    }
    const contentType = res.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentURL}`
      );
      return;
    }

    console.log(await res.text());
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page: ${currentURL}`);
  }
}

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

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
