const PropertyValidator = require("../../DomainLayer/Utils/propertyValidator")
var assert = require("assert");
describe("Property Validator", function () {
    describe("Number", function () {
      it("Number not null", function () {
        try{
            var object = new PropertyValidator.Child({"number": null});
            assert.fail();
        }
        catch(e){
            assert.equal(e,"number cannot be null");
        }
      });

    //   it("Number nullable", function () {
    //     try{
    //         var object = {"number": 1}
    //         PropertyValidator({"nullable": true},object,["number"]);
    //     }
    //     catch(e){
    //         assert.fail();
    //     }
    //   });

    //   it("Property must be a number", function () {
    //     try{
    //         var object = {"number": "a"}
    //         PropertyValidator({"nullable": false},object,"number");
    //         assert.fail();
    //     }
    //     catch(e){
    //       assert.equal(e,"number must be a valid number");
    //     }
    //   });

    //   it("Greater than max value", function () {
    //     try{
    //         var object = {"number": 10}
    //         PropertyValidator({"nullable": false,"max": 5},object,"number");
    //         assert.fail();
    //     }
    //     catch(e){
    //       assert.equal(e,"number must smaller then 5");
    //     }
    //   });

    //   it("Smaller than min value", function () {
    //     try{
    //         var object = {"number": 1}
    //         PropertyValidator({"nullable": false,"min": 5},object,"number");
    //         assert.fail();
    //     }
    //     catch(e){
    //       assert.equal(e,"number must greaters then 5");
    //     }
    //   });
    })
});