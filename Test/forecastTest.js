const Forecast = require("../DomainLayer/Models/forecast");
var assert = require("assert");
const validForecast = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: 1,
  longitude: 2,
};
const invalidForecast1 = {
  fiveDays: null,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: 1,
  longitude: 2,
};
const invalidForecast2 = {
  fiveDays: 10,
  tenDays: null,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: 1,
  longitude: 2,
};
const invalidForecast3 = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: null,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: 1,
  longitude: 2,
};
const invalidForecast4 = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: null,
  seasonalDry: 30,
  latitude: 1,
  longitude: 2,
};
const invalidForecast5 = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: null,
  latitude: 1,
  longitude: 2,
};
const invalidForecast6 = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: null,
  longitude: 2,
};
const invalidForecast7 = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  seasonalWet: 10,
  seasonalDry: 30,
  latitude: 1,
  longitude: null,
};

describe("Forecast", function () {
  describe("Constructor", function () {
    it("Valid Forecast", function () {
      var forecast = new Forecast(validForecast);
      assert.equal(forecast.fiveDays, 10);
      assert.equal(forecast.tenDays, 15);
      assert.equal(forecast.fifteenDays, 30);
    });

    it("Invalid Forecast five days is null", function () {
      try {
        var forecast = new Forecast(invalidForecast1);
        assert.fail();
      } catch (e) {
        assert.equal(e, "Forecast for Five Days cannot be null.");
      }
    });

    it("Invalid Forecast five days is null", function () {
        try {
          var forecast = new Forecast(invalidForecast1);
          assert.fail();
        } catch (e) {
          assert.equal(e, "Forecast for Five Days cannot be null.");
        }
      });
      
  });
});
