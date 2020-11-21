var fs = require("fs");
var JSONStream = require("JSONStream");
var es = require("event-stream");
var logger = require("./logger.js");

var minimumDistance;

module.exports = async function(event) {
  const data = await parseFile(event);
  logger().info("Sending Data:" + JSON.stringify(data));
  return data;
};

function parseFile(event) {
  return new Promise((resolve, reject) => {
    var dataList = [];
    var jsonData = "./data.json",
      stream = fs.createReadStream(jsonData, {
        encoding: "utf8"
      });
    stream.pipe(JSONStream.parse("*")).pipe(
      es.through(function(data) {
        try {
          var srcLat = data.latitude;
          var srcLong = data.longitude;
          var destLat = event.queryStringParameters.lat;
          var destLong = event.queryStringParameters.long;
          var distance = Math.abs(
            calculateHaversineDistance(srcLat, srcLong, destLat, destLong)
          );
          if (
            minimumDistance == undefined ||
            minimumDistance == null ||
            minimumDistance > distance
          ) {
            //console.log("Clearing existing data");
            minimumDistance = distance;
            dataList.splice(0, dataList.length);
            dataList.push(data);
          } else if (minimumDistance == distance) {
            //console.log("Same distane data found");
            dataList.push(data);
          }
        } catch (err) {
          reject(err);
        }
      })
    );
    stream.on("end", function() {
      resolve(dataList);
    });
  });
}

function calculateHaversineDistance(srcLat, srcLong, destLat, destLong) {
  try {
    var R = 3958.8;
    var rlat1 = srcLat * (Math.PI / 180);
    var rlat2 = destLat * (Math.PI / 180);
    var difflat = rlat2 - rlat1;
    var difflon = (srcLong - destLong) * (Math.PI / 180);
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  } catch (error) {
    throw error;
  }
}
