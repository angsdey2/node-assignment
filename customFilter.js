var fs = require("fs");
var JSONStream = require("JSONStream");
var es = require("event-stream");
var logger = require("./logger.js");

module.exports = async function(event) {
  const data = await parseFile(event);
  logger().info("Sending Data:" + JSON.stringify(data));
  return data;
};

function parseFile(event) {
  return new Promise((resolve, reject) => {
    try {
      var dataList = [];
      var jsonData = "./data.json",
        stream = fs.createReadStream(jsonData, {
          encoding: "utf8"
        });
      stream.pipe(JSONStream.parse("*")).pipe(
        es.through(function(data) {
          var params = event.queryStringParameters;
          var objectMatches = [];
          Object.keys(params).forEach(function eachKey(key) {
              
            var value = params[key];
            if (data[key] == value) {
                objectMatches.push(true);
            } else {
                objectMatches.push(false);
            }
          });
          if (!objectMatches.includes(false)) {
            dataList.push(data);
          }
        })
      );
      stream.on("end", function() {
        resolve(dataList);
      });
    } catch (err) {
      reject(err);
    }
  });
}
