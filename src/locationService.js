
var minimumDistance;
exports.findNearestLocation = async function(dataList, requestBody, data, callback) {
    try {
      var srcLat = data.latitude;
      var srcLong = data.longitude;
      var destLat = requestBody.lat;
      var destLong = requestBody.long;
      var distance = Math.abs(
        calculateHaversineDistance(srcLat, srcLong, destLat, destLong)
      );
      if (
        minimumDistance == undefined ||
        minimumDistance == null ||
        minimumDistance > distance
      ) {
        minimumDistance = distance;
        dataList.splice(0, dataList.length);
        dataList.push(data);
      } else if (minimumDistance == distance) {
        dataList.push(data);
      }
    } catch (err) {
      callback(err, null);
    }
    callback(null, dataList);
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