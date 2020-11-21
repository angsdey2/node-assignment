const longLatService = require("../longlat");
var load1 = {
  httpMethod: "GET",
  path: "/longlat",
  headers: {},
  queryStringParameters: {
    long: "-72.06",
    lat: "42.55"
  }
};

var load2 = {
  httpMethod: "GET",
  path: "/longlat",
  headers: {},
  queryStringParameters: {
    long: "100000",
    lat: "100000"
  }
};

describe("LongLat-Service", () => {
  test("Find-By-LongLat", async function() {
    var dataList = await longLatService(load1);
    expect(dataList.length).toBe(1);
  });

  test("Find-By-Invalid-LongLat", async function() {
    var dataList = await longLatService(load2);
    expect(dataList.length).toBe(0);
  });
});
