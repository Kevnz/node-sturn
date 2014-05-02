
/**
 * Modules dependencies.
 * @api private
 */

var request = require('request');


/**
 * Url to request an available turn server.
 * This is only experimental.
 * @type {String}
 */

var turn = 'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913';

/**
 * List of available stun servers.
 * @type {Array}
 */

var stun = [
  'stun.l.google.com:19302',
  'stun1.l.google.com:19302',
  'stun2.l.google.com:19302',
  'stun3.l.google.com:19302',
  'stun4.l.google.com:19302',
  'stun.ekiga.net',
  'stun.ideasip.com',
  'stun.iptel.org',
  'stun.rixtelecom.se',
  'stun.schlund.de',
  'stunserver.org',
  'stun.stunprotocol.org:3478',
  'stun.voiparound.com',
  'stun.voipbuster.com',
  'stun.voipstunt.com'
];


/**
 * Expose 'sturn'
 */

module.exports = sturn;


function sturn(fn) {
  // NOTE: right now we don't return a random server
  var servers = {
    iceServers : [{
      'url': stun[0]
    }]
  };
  sturn.turn(function(body) {
    console.log(body);
  });
};


/**
 * Request available turn server metadata.
 * 
 * @param  {Function} fn [description]
 * @return {Object}
 * @api public
 */

sturn.turn = function(fn) {
  request(turn, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var server = JSON.parse(body);
      fn({
        'url' : 'turn:' + server.username + '@' + server.turn,
        'credential' : server.password
      });
    }
  });
};
