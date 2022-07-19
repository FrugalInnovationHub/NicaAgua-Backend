const Forecast = require("../DomainLayer/Models/forecast");
var moment = require('moment');
var assert = require("assert");
const validForecast = {
  fiveDays: 10,
  tenDays: 15,
  fifteenDays:30,
  fiveDaysMin:5,
  fiveDaysMax:15,
  tenDaysMin:15,
  tenDaysMax:25,
  fifteenDaysMin:25,
  fifteenDaysMax:50,
  date: "10-10-2022"
};

const validForecast2 = {...validForecast,date:null}

/**5 Days Forecast null*/
const invalidForecast1 = {...validForecast,fiveDays:null};
/**10 Days Forecast null*/
const invalidForecast2 = {...validForecast,tenDays:null};
/**15 Days Forecast null*/
const invalidForecast3 = {...validForecast,fifteenDays:null};
/**10 forecast smaller than 5 days*/
const invalidForecast4 = {...validForecast,fiveDaysMax:null,tenDaysMax:null,fifteenDaysMax:null,fiveDaysMin:null,tenDaysMin:null,fifteenDaysMax:null};
/**15 Days forecast smaller than 5 days*/
const invalidForecast5 = {...validForecast, fifteenDays : 9};
const invalidForecast6 = {...validForecast, tenDays : 9};
const invalidForecast7 = {...validForecast, fiveDaysMax : 0};
const invalidForecast8 = {...validForecast, tenDaysMax : 0};
const invalidForecast9 = {...validForecast, fifteenDaysMax : 0};



describe("Forecast", function () {
  describe("Constructor", function () {
    it("Valid Forecast", function () {
      var forecast = new Forecast(validForecast);
      assert.equal(forecast.fiveDays, 10);
      assert.equal(forecast.tenDays, 15);
      assert.equal(forecast.fifteenDays, 30);
      assert.equal(forecast.date, "10-10-2022");
    });
    it("Valid Forecast 2", function () {
      var forecast = new Forecast(validForecast2);
      var date = moment(new Date()).format('DD-MM-YYYY');
      assert.equal(forecast.date,date );
    });

    it("Invalid Forecast five days is null", function () {
      try {
        var forecast = new Forecast(invalidForecast1);
        assert.fail();
      } catch (e) {
        assert.equal(e,"Forecast for Five Days cannot be null.\n");
      }
    });

    it("Invalid Forecast 10 days is null", function () {
        try {
          var forecast = new Forecast(invalidForecast2);
          assert.fail();
        } catch (e) {
          assert.equal(e, "Forecast for Ten Days cannot be null.\n");
        }
      });
    
    it("Invalid Forecast 15 days is null", function () {
        try {
          var forecast = new Forecast(invalidForecast3);
          assert.fail();
        } catch (e) {
          assert.equal(e, "Forecast for Fifteen Days cannot be null.\n");
        }
      });
    it("Invalid Max and Min", function () {
        try {
          var forecast = new Forecast(invalidForecast4);
          assert.fail();
        } catch (e) {
          var errors = e.split('\n');
          assert.equal(errors.length, 6);
        }
      });
    it("Invalid Forecast, 15 < 10", function () {
        try {
          var forecast = new Forecast(invalidForecast5);
          assert.fail();
        } catch (e) {
          assert.equal(e, "(10,15) days forecast cannot be greater than (5,10) days forecast.\n");
        }
      });
    it("Invalid Forecast, 10 < 5", function () {
        try {
          var forecast = new Forecast(invalidForecast6);
          assert.fail();
        } catch (e) {
          assert.equal(e, "(10,15) days forecast cannot be greater than (5,10) days forecast.\n");
        }
      });

      it("Invalid Forecast, Max < Min for 5 days", function () {
        try {
          var forecast = new Forecast(invalidForecast7);
          assert.fail();
        } catch (e) {
          assert.equal(e, "Min cannot be greater than Max.\n");
        }
      });

      it("Invalid Forecast, Max < Min for 10 days", function () {
        try {
          var forecast = new Forecast(invalidForecast8);
          assert.fail();
        } catch (e) {
          assert.equal(e,"Min cannot be greater than Max.\n");
        }
      });

      it("Invalid Forecast, Max < Min for 15 days", function () {
        try {
          var forecast = new Forecast(invalidForecast9);
          assert.fail();
        } catch (e) {
          assert.equal(e,"Min cannot be greater than Max.\n");
        }
      });
      
  });
});
