const { crawlPage } = require('./crawl');
const { printReport } = require('./report.js');

async function main() {
  if (process.argv.length !== 3) {
    console.log('on website provided');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
