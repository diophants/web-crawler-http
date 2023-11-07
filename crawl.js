function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const fullURL = `${urlObj.host}${urlObj.pathname}`;
  if (fullURL.length > 0 && fullURL.slice(-1) !== '/') {
    return fullURL;
  }
  return fullURL.slice(0, -1);
}

module.exports = { normalizeURL };
