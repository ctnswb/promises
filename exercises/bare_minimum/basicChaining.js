/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promisification = require('./promisification.js');
var promiseConstructors = require('./promiseConstructor.js');

var getGitHubProfileAsync = promisification.getGitHubProfileAsync;
var pluckFirstLineFromFileAsync = promiseConstructors.pluckFirstLineFromFileAsync;

var writeState = function( profile, writeFilePath, callback){
  fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(err, content) {
    if(err) {
      return callback(err,null);
    } else {
      return callback(null, content);
    }
  });
};

var writeStateAsync = Promise.promisify(writeState);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      return getGitHubProfileAsync(user);
    })
    .then(function(user) {
      return writeStateAsync(user, writeFilePath);
    })
    .catch(function(err) {
      console.log(err.message);
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
