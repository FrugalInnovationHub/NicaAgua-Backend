const Region = require('../DomainLayer/Models/region')
var assert = require('assert');
const validRegion = {code:'NIC01',name:"Region 1", country:"Nicaragua",longitude:2,latitude:1}

const invalidRegion1 = {code:'NIC01',name:null, country:"Nicaragua",longitude:2,latitude:1}
const invalidRegion2 = {code:'NIC01',name:"Region 1", country:null,longitude:2,latitude:1}
const invalidRegion3 = {code:'NIC01',name:"Region 1", country:"Nicaragua",latitude:"A",longitude:2}
const invalidRegion4 = {code:'NIC01',name:"Region 1", country:"Nicaragua",latitude:1,longitude:"A"}
const invalidRegion5 = {code:'NIC01',name:"Region 1", country:"Nicaragua"}
const invalidRegion6 = {code:'NIC01',name:"Region 1", country:"Nicaragua"}
const invalidRegion7 = {name:"Region 1", country:"Nicaragua"}

describe('Region', function () {
  describe('Constructor', function () {
    it("Valid Region",function(){
      var newRegion = new Region(validRegion);
      assert.equal(newRegion.name, 'Region 1');
      assert.equal(newRegion.country, 'Nicaragua');
      assert.equal(newRegion.latitude, 1);
      assert.equal(newRegion.longitude, 2);
    });
  });

  describe('Constructor', function () {
    it("Null name",function(){
    try{
      var newRegion = new Region(invalidRegion1);
      assert.fail();
    }
    catch(e){
        assert.equal(e, 'Name cannot be null.');
    }
    });
  });

  describe('Constructor', function () {
    it("Null Country",function(){
    try{
      var newRegion = new Region(invalidRegion2);
      assert.fail();
    }
    catch(e){
        assert.equal(e, 'Country cannot be null.');
    }
    });
  });


  describe('Constructor', function () {
    it("Invalid Latiture",function(){
    try{
      var newRegion = new Region(invalidRegion3);
      assert.fail();
    }
    catch(e){
        assert.equal(e, 'Latitude must be a number.');
    }
    });
  });

  
  describe('Constructor', function () {
    it("Invalid Longitude",function(){
    try{
      var newRegion = new Region(invalidRegion4);
      assert.fail();
    }
    catch(e){
        assert.equal(e, 'Longitude must be a number.');
    }
    });
  });

  describe('Constructor', function () {
    it("Null Latitude",function(){
    try{
      var newRegion = new Region(invalidRegion5);
      assert.equal(newRegion instanceof Region,true)
    }
    catch(e){
      assert.fail();
    }
    });
  });

  describe('Constructor', function () {
    it("Null Longitude",function(){
    try{
      var newRegion = new Region(invalidRegion6);
      assert.equal(newRegion instanceof Region,true)
    }
    catch(e){
      assert.fail();
    }
    });
  });

  describe('Constructor', function () {
    it("Invalid Code",function(){
    try{
      var newRegion = new Region(invalidRegion7);
      assert.fail();
    }
    catch(e){
      assert.equal(newRegion,undefined);
      assert.equal(e, "Code cannot be null, must be a string and must be 5 characters long.");
    }
    });
  });
})