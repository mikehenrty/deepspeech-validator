const path = require('path');
const jsonfile = require('jsonfile');
const ff = require('ff');
const DeepSpeech = require('./lib/deepspeech');

const CONFIG_PATH = path.resolve(__dirname, 'config.json');

function runTests() {
  let f = ff(
    () => {
      jsonfile.readFile(CONFIG_PATH, f());
    },

    config => {
      let dsPath = config.deepspeech_path;
      let ds = new DeepSpeech(dsPath);
      ds.run({}, f());
    },

    results => {
      console.log('got deepspeech results', results);
    }
  );

  f.onError(e => {
    console.error('top level error', e);
  });
}

module.exports = runTests;

if (require.main === module) {
  runTests();
}
