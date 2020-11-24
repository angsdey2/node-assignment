const validParamList = [
  "zip",
  "type",
  "city",
  "acceptable_cities",
  "unacceptable_cities",
  "state",
  "county",
  "timezone",
  "area_codes",
  "latitude",
  "longitude",
  "country",
  "estimated_population"
];

module.exports = async function(event, callback) {
  var serviceData;
  try {
    if (event.httpMethod == "GET") {
      serviceData = event.queryStringParameters;
      if (serviceData == undefined || Object.keys(serviceData).length == 0) {
        callback("No Query parameter specified", null);
      } else {
        Object.keys(serviceData).forEach(function eachKey(key) {
          if (!(validParamList.indexOf(key) > -1)) {
            callback("Invalid queryParam provided: " + key, null);
          }
        });
      }
    } else if (event.httpMethod == "POST" && event.headers["content-type"] == "application/json") {
      serviceData = JSON.parse(event.body);
      if (serviceData.long == undefined || serviceData.lat == undefined) {
        callback("Latitude and Longitude both must be specified", null);
      } else if (
        isNaN(serviceData.long) ||
        isNaN(serviceData.lat) ||
        serviceData.long > 180 ||
        serviceData.long < -180 ||
        serviceData.lat > 90 ||
        serviceData.lat < -90
      ) {
        callback(
          "Latitude[-90 to +90] and Longitude[-180 to +180] must be within range and both should be nemeric",
          null
        );
      }
    }
  } catch (error) {
    callback(error, null);
  }
  callback(null, serviceData);
};
