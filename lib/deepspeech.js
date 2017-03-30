const spawn = require('child_process').spawn;

// DeepSpeech test runner.
function DeepSpeech(dir, env) {
  this.directory = dir;
}

DeepSpeech.prototype.run = function(env, cb) {
  const proc = spawn('python', ['-u', 'DeepSpeech.py'], {
    cwd: this.directory
  });

  proc.stdout.on('data', data => {
    console.log(`----- ${data}`);
  });

  proc.stderr.on('data', data => {
    console.log(`+++++ ${data}`);
  });

  proc.on('close', code => {
    console.log('processes exited with code', code);
    cb(null, code);
  });

  proc.on('error', err => {
    console.error('child process error', err);
    cb(err);
  });
};

module.exports = DeepSpeech;
