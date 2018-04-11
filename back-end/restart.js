var scrape = require('./scrape');
var restart = function() {
    console.log('Yeeee');
    scrape();
}
module.exports = restart;