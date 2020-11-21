const customFilter = require("../customFilter.js");
var load1 = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    state: "MA"
  }
};

var load2 = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    state: "MA",
    area_codes: "978"
  }
};

var load3 = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    county: "xyz"
  }
};

describe("Custom-Filter-Service", () => {
    test("Find-By-One-Attribute", async function() {
      var dataList = await customFilter(load1);
      expect(dataList.length).toBe(694);
    });
  
    test("Find-By-Two-Attribute", async function() {
      var dataList = await customFilter(load2);
      expect(dataList.length).toBe(66);
    });

    test("Find-By-Invalid-Attribute", async function() {
      var dataList = await customFilter(load3);
      expect(dataList.length).toBe(0);
    });
  });
