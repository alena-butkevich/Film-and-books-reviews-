function route(handle, pathname, response, postData) {
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write(postData);
  }
}

exports.route = route;