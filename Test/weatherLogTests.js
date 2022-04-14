const { WeatherLog, WeatherLogParameter } = require('../DomainLayer/Models/weatherLog');
var assert = require('assert');

var validParam1 = { "unit": "mm", "name": "precipitation", "value": 1 }
var validParam2 = { "unit": "%", "name": "humidity" }
var invalidParam1 = { "unit": "%", "value": 60 }
var invalidParam2 = { "name": "precipitation", "value": 1 }

var validWeatherLog = { "dateTime": "2022-01-01", "userId": "123", "parameters": [validParam1, validParam2],"regions": ["NIC01"] };
var validWeatherLog2 = { "userId": "123", "parameters": [validParam1, validParam2],"regions": ["NIC01"] };
var invalidWeatherLog1 = { "userId": null, "parameters": [validParam1, validParam2],"regions": ["NIC01"] };
var invalidWeatherLog2 = { "userId": "123", "parameters": [validParam1, validParam2] };
var invalidWeatherLog3 = { "userId": "123", "parameters": null,"regions": ["NIC01"] };
var invalidWeatherLog4 = { "dateTime": "ABCE","userId": "123", "parameters": [validParam1, validParam2],"regions": ["NIC01"] };


describe('WeatherLogParameter', function () {
    describe('Constructor', function () {
        it("Valid WeatherParameter", function () {
            var weatherParameter = new WeatherLogParameter(validParam1)
            assert.equal(weatherParameter.name, 'precipitation');
            assert.equal(weatherParameter.value, 1);
            assert.equal(weatherParameter.unit, "mm");
        });
    });

    describe('Constructor', function () {
        it("Valid WeatherParameter with no Value", function () {
            var weatherParameter = new WeatherLogParameter(validParam2)
            assert.equal(weatherParameter.name, 'humidity');
            assert.equal(weatherParameter.value, 0);
            assert.equal(weatherParameter.unit, "%");
        });
    });

    describe('Constructor', function () {
        it("Invalid Name", function () {
            try {
                var weatherParameter = new WeatherLogParameter(invalidParam1)
                assert.fail()
            }
            catch (e) {
                assert.equal(weatherParameter, null);
                assert.equal(e, "Invalid Name");
            }
        });
    });

    describe('Constructor', function () {
        it("Invalid Unit", function () {
            try {
                var weatherParameter = new WeatherLogParameter(invalidParam2)
                assert.fail()
            }
            catch (e) {
                assert.equal(weatherParameter, null);
                assert.equal(e, "Invalid Unit");
            }
        });
    });
});


describe('WeatherLog', function () {
    describe('Constructor', function () {
        it("Valid WeatherLog", function () {
            var weatherLog = new WeatherLog(validWeatherLog);
            assert.equal(weatherLog.dateTime,'2022-01-01T00:00:00.000Z')
            assert.equal(weatherLog.userId,"123")
            assert.equal(Array.isArray(weatherLog.parameters),true)
            assert.equal(Array.isArray(weatherLog.regions),true)
            weatherLog = weatherLog.toJson();
            assert.equal(weatherLog.dateTime,'2022-01-01T00:00:00.000Z')
            assert.equal(weatherLog.userId,"123")
            assert.equal(Array.isArray(weatherLog.parameters),true)
            assert.equal(Array.isArray(weatherLog.regions),true)
        });
    });

    describe('Constructor', function () {
        it("Valid WeatherLog 2", function () {
            var weatherLog = new WeatherLog(validWeatherLog2);
            assert.equal(weatherLog.dateTime,new Date().toJSON())
        });
    });

    
    describe('Constructor', function () {
        it("Invalid WeatherLog", function () {
            try{
            var weatherLog = new WeatherLog(invalidWeatherLog1);
            assert.fail();
            }
            catch(e){
                assert.equal(e,"Invalid UserId")
            }
        });
    });

    describe('Constructor', function () {
        it("Invalid WeatherLog Invalid Regions", function () {
            try{
            var weatherLog = new WeatherLog(invalidWeatherLog2);
            assert.fail();
            }
            catch(e){
                assert.equal(e,"Regions cannot be null or empty.")
            }
        });
    });

    
    describe('Constructor', function () {
        it("Invalid WeatherLog Invalid Parameters", function () {
            try{
            var weatherLog = new WeatherLog(invalidWeatherLog3);
            assert.fail();
            }
            catch(e){
                assert.equal(e,"Parameters cannot be null or empty.")
            }
        });
    });

    describe('Constructor', function () {
        it("Invalid WeatherLog Invalid Date", function () {
            try{
            var weatherLog = new WeatherLog(invalidWeatherLog4);
            assert.fail();
            }
            catch(e){
                assert.equal(e,"Invalid Date")
            }
        });
    });
});