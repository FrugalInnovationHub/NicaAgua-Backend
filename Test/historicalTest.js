const Historical = require("../DomainLayer/Models/historical");
var moment = require('moment');
var assert = require("assert");
var expect = require('expect');

describe('Historical', function () {
    describe('Constructor', function () {
        it("Valid Historical Data", function () {
            const historicalObj = { "El Bramadero": { "January": { 1990: 1000 } } }
            var hist = new Historical(historicalObj);
            assert.equal(hist.community, 'El Bramadero');
            assert.equal(hist.month, 'January');
        });

        it("Invalid Historical Month", function () {
            const historicalObj = { "El Bramadero": { "Jan": { 1990: 1000 } } }
            try{
                new Historical(historicalObj);
                assert.fail("Invalid Month");}
            catch(e){
                assert.equal(e, "Invalid Month");
            }
        });

        it("Invalid Historical Year", function () {
            const historicalObj = { "El Bramadero": { "January": { "a": 1000 } } }
            try{
                new Historical(historicalObj);
                assert.fail("Invalid Year");}
            catch(e){
                assert.equal(e, "Invalid Year");
            }
        });
        it("Invalid Historical Value", function () {
            const historicalObj = { "El Bramadero": { "January": { "1991": "1a" } } }
            try{
                new Historical(historicalObj);
                assert.fail("Invalid Value");}
            catch(e){
                assert.equal(e, "Invalid Value");
            }
        });
    });
});