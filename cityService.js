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
          if (data.primary_city.includes(event.queryStringParameters.city)) {
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
