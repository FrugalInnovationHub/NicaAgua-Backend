const { Forecast, ShortTermForecasts } = require("../DomainLayer/Models/forecast");
var moment = require('moment');
var assert = require("assert");
const validForecast = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays: 30,
  fiveDaysMin: 5,
  fiveDaysMax: 15,
  tenDaysMin: 15,
  tenDaysMax: 25,
  fifteenDaysMin: 25,
  fifteenDaysMax: 50,
  date: "10-10-2022"
};

const validForecast2 = { ...validForecast, date: null }

/**5 Days Forecast null*/
const invalidForecast1 = { ...validForecast, fiveDays: null };
/**10 Days Forecast null*/
const invalidForecast2 = { ...validForecast, tenDays: null };
/**15 Days Forecast null*/
const invalidForecast3 = { ...validForecast, fifteenDays: null };
/**10 forecast smaller than 5 days*/
const invalidForecast4 = { ...validForecast, fiveDaysMax: null, tenDaysMax: null, fifteenDaysMax: null, fiveDaysMin: null, tenDaysMin: null, fifteenDaysMax: null };
/**15 Days forecast smaller than 5 days*/
const invalidForecast5 = { ...validForecast, fifteenDays: 9 };
const invalidForecast6 = { ...validForecast, tenDays: 9 };
const invalidForecast7 = { ...validForecast, fiveDaysMax: 0 };
const invalidForecast8 = { ...validForecast, tenDaysMax: 0 };
const invalidForecast9 = { ...validForecast, fifteenDaysMax: 0 };

const notificationForecastDry =  {
  "community": "El Naranjito",
  "fiveDays": 8.8081771350306,
  "fiveDaysMax": 27.31868172807918,
  "fiveDaysMin": 10,
  "tenDays": 30.5124437244138,
  "tenDaysMax": 53.65778758500299,
  "tenDaysMin": 12.36709986382461,
  "fifteenDays": 49.06521242509726,
  "fifteenDaysMax": 77.13514239500259,
  "fifteenDaysMin": 20.99528245519194
};

const notificationForecastWet =  {
  "community": "El Naranjito",
  "fiveDays": 30.8081771350306,
  "fiveDaysMax": 27.31868172807918,
  "fiveDaysMin": 5,
  "tenDays": 30.5124437244138,
  "tenDaysMax": 53.65778758500299,
  "tenDaysMin": 12.36709986382461,
  "fifteenDays": 49.06521242509726,
  "fifteenDaysMax": 77.13514239500259,
  "fifteenDaysMin": 20.99528245519194
};



describe("Forecast", function () {
  describe("Constructor", function () {
    it("Valid Forecast", function () {
      var forecast = new Forecast(validForecast);
      assert.equal(forecast.fiveDays, 10);
      assert.equal(forecast.tenDays, 15);
      assert.equal(forecast.fifteenDays, 30);
      date = moment(new Date("10-10-2022")).format('YYYY-MM-DD')
      assert.equal(forecast.date, date);
    });
    it("Valid Forecast 2", function () {
      var forecast = new Forecast(validForecast2);
      var date = moment(new Date()).format('YYYY-MM-DD');
      assert.equal(forecast.date, date);
    });

    it("Invalid Forecast five days is null", function () {
      try {
        var forecast = new Forecast(invalidForecast1);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Invalid Forecast 10 days is null", function () {
      try {
        var forecast = new Forecast(invalidForecast2);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Invalid Forecast 15 days is null", function () {
      try {
        var forecast = new Forecast(invalidForecast3);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });
    it("Invalid Max and Min", function () {
      try {
        var forecast = new Forecast(invalidForecast4);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });
    it("Invalid Forecast, 15 < 10", function () {
      try {
        var forecast = new Forecast(invalidForecast5);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });
    it("Invalid Forecast, 10 < 5", function () {
      try {
        var forecast = new Forecast(invalidForecast6);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Invalid Forecast, Max < Min for 5 days", function () {
      try {
        var forecast = new Forecast(invalidForecast7);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Invalid Forecast, Max < Min for 10 days", function () {
      try {
        var forecast = new Forecast(invalidForecast8);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Invalid Forecast, Max < Min for 15 days", function () {
      try {
        var forecast = new Forecast(invalidForecast9);
        assert.fail();
      } catch (e) {
        assert.ok(true);
      }
    });

    it("Forecast Notification Dry",() =>{
      try {
        var forecast = new Forecast(notificationForecastDry);
        assert.ok(forecast.isDry);
        assert.ok(!forecast.isWet);
      } catch (e) {
        console.log(e);
        assert.fail();
      }
    });

    it("Forecast Notification Wet",() =>{
      try {
        var forecast = new Forecast(notificationForecastWet);
        assert.ok(forecast.isWet);
      } catch (e) {
        assert.fail();
      }
    });

  });
});
