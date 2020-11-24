// lambda-like handler function
var processRequest = require("./processRequest.js");
var logger = require("./logger.js");

exports.handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    try {
      resolve(controlEvent(event));
    } catch (err) {
      reject(Error(err));
    }
  });
  logger().info("Lambda invokation completed");
  return promise;
};

async function controlEvent(event) {
  var path = event.path;
  var data;

  switch (path) {
    case "/custom":
      data = await processRequest.handler(event);
      break;

    default:
      break;
  }
  return data;
}
