const {WaterAlert} = require("../DomainLayer/Models/waterAlert");
var assert = require('assert');

const waterAlert1 = {message:"Message",regions:["NIC01","NIC02"]}
const invalidWaterAlert = {message:"Message",regions:null}

describe('Water Alert', function () {
    describe('Constructor', function () {
      it("Valid Water Alert", function () {
        var waterAlert = new WaterAlert(waterAlert1);
        assert.equal(waterAlert.message, 'Message');
        assert.equal(waterAlert.regions.length, 2);
      });
      it("Invalid Water Alert", function () {
        try{
        var waterAlert = new WaterAlert(invalidWaterAlert);
        assert.fail();
        }
        catch(e){
          var index = e.indexOf("Regions must be an Array with at least one element.");
          assert.ok(index > -1);
        }
      });

      it("Null Water Alert", function () {
        try{
        var waterAlert = new WaterAlert(null);
        assert.fail();
        }
        catch(e){
          var index = e.indexOf("Regions must be an Array with at least one element.");
          assert.ok(index > -1);
        }
      });
    });
})