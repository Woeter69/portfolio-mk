const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  const { data } = await axios.get('https://scholar.google.com/citations?user=PZ-8nBQAAAAJ&hl=en');
  const $ = cheerio.load(data);
  const stats = {
      citations: { all: 0, since2018: 0 },
      h_index: { all: 0, since2018: 0 },
      i10_index: { all: 0, since2018: 0 },
  };

  const statsTable = $('#gsc_rsb_st');
  if (statsTable.length) {
      const rows = statsTable.find('tbody tr');
      const parseNum = (val) => parseInt(val.replace(/,/g, ''), 10) || 0;

      const citRow = $(rows[0]).find('.gsc_rsb_std');
      if (citRow.length >= 2) {
          stats.citations.all = parseNum($(citRow[0]).text());
          stats.citations.since2018 = parseNum($(citRow[1]).text());
      }

      const hRow = $(rows[1]).find('.gsc_rsb_std');
      if (hRow.length >= 2) {
          stats.h_index.all = parseNum($(hRow[0]).text());
          stats.h_index.since2018 = parseNum($(hRow[1]).text());
      }

      const i10Row = $(rows[2]).find('.gsc_rsb_std');
      if (i10Row.length >= 2) {
          stats.i10_index.all = parseNum($(i10Row[0]).text());
          stats.i10_index.since2018 = parseNum($(i10Row[1]).text());
      }
  }
  console.log(JSON.stringify(stats, null, 2));
}
test();
