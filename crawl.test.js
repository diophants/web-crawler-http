const { normalizeURL, getURLsFromHTML, sortPages } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.BOOT.DEV/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'https://BLOG.BOOT.DEV/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML ablolute ', () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">
                    Boot.dev Blog
                </a>
            </body>
        </html>
    `;
  const baseURL = 'https://blog.boot.dev/path/';
  const actual = getURLsFromHTML(inputHTMLBody, baseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative ', () => {
  const inputHTMLBody = `
          <html>
              <body>
                  <a href="/path/">
                      Boot.dev Blog
                  </a>
              </body>
          </html>
      `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, baseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML both ', () => {
  const inputHTMLBody = `
          <html>
              <body>
                  <a href="https://blog.boot.dev/path1/">
                      Boot.dev Blog Path One
                  </a>
                  <a href="/path2/">
                      Boot.dev Blog Path Two
                  </a>
              </body>
          </html>
      `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, baseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid ', () => {
  const inputHTMLBody = `
            <html>
                <body>
                    <a href="invalid">
                        invalid URL
                    </a>
                </body>
            </html>
        `;
  const baseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
