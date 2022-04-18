/*Creating Socket Server*/
const httpProxy = require("http-proxy")
httpProxy.createServer({
  target: 'ws://localhost:88',
  ws: true
}).listen(88); 
/* Connect Socket Server*/
var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 80
  }
});
var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});
 
proxyServer.on('upgrade-proxy-with', function (req, socket, head) {
  proxy.ws(req, socket, head);
console.log(head)
});
 proxyServer.on('open', function (proxySocket) {
  // listen for messages coming FROM the target here
  proxySocket.on('data', hybiParseAndLogMessage);
console.log("Client opened:" + hybiParseAndLogMessage)
});
 📌
proxyServer.on('close', function (res, socket, head) {
  // view disconnected websocket connections
  console.log('WebSocket and Proxy Client are disconnected');
});
proxyServer.listen(80);
