// lambda-like handler function
var zipService = require("./zipService.js");
var cityService = require("./cityService.js");
var longlat = require("./longlat.js");
var customFilter = require("./customFilter.js");
var logger = require("./logger.js");

exports.handler = async event => {
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
    case "/zipcode":
      data = await zipService(event);
      break;

    case "/city":
      data = await cityService(event);
      break;

    case "/longlat":
      data = await longlat(event);
      break;

    case "/custom":
      data = await customFilter(event);
      break;

    default:
      break;
  }
  return data;
}
