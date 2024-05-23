var assert = require("assert");
const {ShortTermForecasts} = require("../DomainLayer/Models/forecast");

const dryForecast=  {"forecasts":[
    {
      "community": "DRY",
      "fiveDays": 8.8081771350306,
      "fiveDaysMax": 27.31868172807918,
      "fiveDaysMin": 10,
      "tenDays": 30.5124437244138,
      "tenDaysMax": 53.65778758500299,
      "tenDaysMin": 12.36709986382461,
      "fifteenDays": 70.06521242509726,
      "fifteenDaysMax": 77.13514239500259,
      "fifteenDaysMin": 20.99528245519194
    },
    {
      "community": "WET",
      "fiveDays": 30.8081771350306,
      "fiveDaysMax": 27.31868172807918,
      "fiveDaysMin": 10,
      "tenDays": 30.5124437244138,
      "tenDaysMax": 53.65778758500299,
      "tenDaysMin": 12.36709986382461,
      "fifteenDays": 70.06521242509726,
      "fifteenDaysMax": 77.13514239500259,
      "fifteenDaysMin": 20.99528245519194
    }
  ]};

describe("Shorterm Forecasts", function () {
    it("Dry Forecast", function () {
      const shortTerm = new ShortTermForecasts(dryForecast);
      assert.equal(shortTerm.dryRegions[0],"DRY");
      assert.equal(shortTerm.wetRegions[0],"WET");
      assert.ok(true);
    });
    
  })