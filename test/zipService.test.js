const zipService = require("../zipService");
var load1 = {
  httpMethod: "GET",
  path: "/zip",
  headers: {},
  queryStringParameters: {
    zip: "01242"
  }
};

var load2 = {
  httpMethod: "GET",
  path: "/zip",
  headers: {},
  queryStringParameters: {
    zip: "468"
  }
};

var load3 = {
  httpMethod: "GET",
  path: "/zip",
  headers: {},
  queryStringParameters: {
    zip: "123456"
  }
};

describe("Zip-Service", () => {
  test("Find-By-Zip-Full", async function() {
    var dataList = await zipService(load1);
    expect(dataList.length).toBe(1);
  });

  test("Find-By-Zip-Partial", async function() {
    var dataList = await zipService(load2);
    expect(dataList.length).toBe(12);
  });

  test("Find-By-Zip-Invalid", async function() {
    var dataList = await zipService(load3);
    expect(dataList.length).toBe(0);
  });
});
