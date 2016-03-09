
function createcomment(response, postData) {

 var responseBody = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/result" method="post">'+
    '<textarea name="text" rows="10" cols="40"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(responseBody);
    response.end();
}

function result(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  var str = postData.replace(/\+/gi, " ");
  str = str.replace(/text=/g, '');
  response.write(str);
  response.end();
}

exports.createcomment = createcomment;
exports.result = result;