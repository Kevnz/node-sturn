
/**
 * Expose 'turn'
 */

module.exports = turn;


function request(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      fn(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}

/**
 * turn constructor.
 * @api public
 */

function turn(url) {
  url = url || 'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913';
  return function(peer) {
    request(url, function(server) {
      var servers = peer.get('servers');
      servers.iceServers.push({
        'url' : 'turn:' + server.username + '@' + server.turn,
        'credential' : server.password
      });
      peer.set('servers', servers);
    });
  };
}
