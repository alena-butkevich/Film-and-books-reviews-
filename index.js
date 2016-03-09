var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/createcomment"] = requestHandlers.createcomment;
handle["/result"] = requestHandlers.result;

server.start(router.route, handle);
