const { crawlPage } = require('./crawl');

async function main() {
  if (process.argv.length !== 3) {
    console.log('on website provided');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  crawlPage(baseURL);
}

main();
