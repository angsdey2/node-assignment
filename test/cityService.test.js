const cityService = require("../cityService");
var load1 = {
  httpMethod: "GET",
  path: "/city",
  headers: {},
  queryStringParameters: {
    city: "Amherst"
  }
};

var load2 = {
  httpMethod: "GET",
  path: "/city",
  headers: {},
  queryStringParameters: {
    city: "Otis"
  }
};

var load3 = {
  httpMethod: "GET",
  path: "/city",
  headers: {},
  queryStringParameters: {
    city: "xyz"
  }
};

describe("City-Service", () => {
  test("Find-By-City-Full-Name", async function() {
    var dataList = await cityService(load1);
    expect(dataList.length).toBe(5);
  });

  test("Find-By-City-Partial-Name", async function() {
    var dataList = await cityService(load2);
    expect(dataList.length).toBe(2);
  });

  test("Find-By-City-Invalid-Name", async function() {
    var dataList = await cityService(load3);
    expect(dataList.length).toBe(0);
  });
});
