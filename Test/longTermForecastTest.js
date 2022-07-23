const {LongTermForecast} = require("../DomainLayer/Models/forecast");
var moment = require('moment');
var assert = require("assert");

const validLongTermForecast = {
  dry: 10,
  wet: 15,
  startDate : "2022-01-01 GMT",
  endDate : "2022-04-01",
  date:"2021-12-31"
};
const validLongTermForecast2= {...validLongTermForecast,date:null};
const invalidLongTermForecast1= {...validLongTermForecast,dry:120};
const invalidLongTermForecast2= {...validLongTermForecast,dry:90,wet:20};
const invalidLongTermForecast3= {...validLongTermForecast,startDate:null};
const invalidLongTermForecast4= {...validLongTermForecast,endDate:null};
const invalidLongTermForecast5= {...validLongTermForecast,startDate:"2022-01-01",endDate:"2021-12-01"};


describe("Long Term Forecast", function () {
  describe("Constructor", function () {
    it("Valid Long Term forecast", function () {
      var forecast = new LongTermForecast(validLongTermForecast);
      assert.equal(forecast.dry, 10);
      assert.equal(forecast.wet, 15);
      assert.equal(forecast.normal, 75);
      startDate = moment(new Date("2022-01-01")).format('YYYY-MM-DD');
      assert.equal(forecast.startDate, startDate);
      endDate = moment(new Date("2022-04-01")).format('YYYY-MM-DD');
      assert.equal(forecast.endDate, endDate);
      date = moment(new Date("2021-12-31")).format('YYYY-MM-DD');
      assert.equal(forecast.date, date);
    });
    it("Valid Forecast 2", function () {
      var forecast = new LongTermForecast(validLongTermForecast2);
      var date = moment(new Date()).format('YYYY-MM-DD');
      assert.equal(forecast.date,date );
    });

    it("Invalid Long Term Forecast Dry > 100", function () {
      try {
        var forecast = new LongTermForecast(invalidLongTermForecast1);
        assert.fail();
      } catch (e) {
        assert.equal(e,"Dry and Wet should sum less than 100.");
      }
    });

    it("Invalid Long Term Forecast Dry + Wet> 100", function () {
      try {
        var forecast = new LongTermForecast(invalidLongTermForecast2);
        assert.fail();
      } catch (e) {
        assert.equal(e,"Dry and Wet should sum less than 100.");
      }
    });
    
    it("Invalid Long Term Forecast Start date Null", function () {
        try {
          var forecast = new LongTermForecast(invalidLongTermForecast3);
          assert.fail();
        } catch (e) {
          assert.equal(e,"startDate cannot be null");
        }
      });    

    it("Invalid Long Term Forecast End date Null", function () {
        try {
          var forecast = new LongTermForecast(invalidLongTermForecast4);
          assert.fail();
        } catch (e) {
          var index = e.indexOf("endDate cannot be null");
          assert.ok( index != -1);
        }
      });   
    
    it("Invalid Long Term Forecast Start Date should be Smaller than End Date", function () {
      try {
        var forecast = new LongTermForecast(invalidLongTermForecast5);
        assert.fail();
      } catch (e) {
        assert.equal(e,"startDate must be smaller than endDate.");
      }
    });  
  });
});
