var http = require('http'),
    httpProxy = require('http-proxy');
 var proxy = httpProxy.createProxyServer({});// Creating Custom
 
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
 
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
ssl: {
    key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
  },
    target: 'http://127.0.1.1:80',
secure: true,
changeOrigin: true
  });
});
 
console.log("Proxy listening on port 80 ")
server.listen(80);
