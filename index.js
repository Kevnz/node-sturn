
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
 * NOTE: right now we just return the first one
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


/**
 * Return a sturn and turn peer
 * connection config.
 * 
 * @param  {Function} fn
 * @return {Object}
 * @api public
 */

function sturn(fn) {
  // NOTE: for firefox we should return
  // the ip address
  var servers = {
    iceServers : [sturn.stun()]
  };
  sturn.turn(function(body) {
    servers.iceServers.push(body);
    fn(servers);
  });
};


/**
 * Return available stun server metadata.
 *
 * Right now it always return stun.l.google.com:19302
 * until we check each stun server connection.
 * 
 * @return {Object}
 * @api public
 */

sturn.stun = function() {
  return {
    url: stun[0]
  };
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
        'url' : server.uris[0],
        'username': server.username,
        'credential' : server.password
      });
    }
  });
};
