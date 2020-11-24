// lambda-like handler function
var processRequest = require("./processRequest.js");
var logger = require("./logger.js");

exports.handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    try {
      resolve(processRequest.handler(event));
    } catch (err) {
      reject(Error(err));
    }
  });
  logger().info("Lambda invokation completed");
  return promise;
};


