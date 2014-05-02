
/**
 * Modules dependencies.
 * @api private
 */

var request = require('request');


var url = 'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913';


/**
 * Expose 'sturn'
 */

module.exports = sturn;


/**
 * sturn constructor.
 * @api public
 */

function sturn(fn) {
}


sturn.stun = function(fn) {

};

sturn.turn = function(fn) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page
    }
  });
};
