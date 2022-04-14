const {WaterAlert} = require("../DomainLayer/Models/waterAlert");
var assert = require('assert');

const waterAlert1 = {message:"Message",regions:["NIC01","NIC02"]}

describe('Water Alert', function () {
    describe('Constructor', function () {
      it("Valid Water Alert", function () {
        var waterAlert = new WaterAlert(waterAlert1);
        assert.equal(waterAlert.message, 'Message');
        assert.equal(waterAlert.regions.length, 2);
      });
    });
})