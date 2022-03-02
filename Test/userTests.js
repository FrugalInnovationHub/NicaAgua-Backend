const {User} = require('../DomainLayer/Models/user');
var assert = require('assert');

const validRegions = ["NIC01","NIC02"];
const invalidRegions = [null];

const validUser = { firstName: "Name", lastName: "LastName", phoneNumber: "6507326291", regions: validRegions, hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=' }
const validUser2 = { firstName: "Name", lastName: "LastName", phoneNumber: "6507326291", regions: validRegions, password: '123' }
const invalidUser = { firstName: null, lastName: "LastName", phoneNumber: "6507326291", regions: validRegions, hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=' }
const invalidUser5 = { firstName: "Name", lastName: null, phoneNumber: "6507326291", regions: validRegions, hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=' }
const invalidUser2 = { firstName: "Name", lastName: "LastName", phoneNumber: null, regions: validRegions, hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=' }
const invalidUser3 = { firstName: "Name", lastName: "LastName", phoneNumber: "ABC", regions: validRegions, hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=' }
const invalidUser4 = {firstName:"Name",lastName:"LastName",phoneNumber:"6507326291",regions:invalidRegions,hashedPassword: 'oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg='}

describe('User', function () {
  describe('Constructor', function () {
    it("Valid User", function () {
      var newUser = new User(validUser);
      assert.equal(newUser.firstName, 'Name');
      assert.equal(newUser.lastName, 'LastName');
      assert.equal(newUser.phoneNumber, '6507326291');
      assert.equal(newUser.checkPassword("pwd"), true) //Can only check Password
      assert.equal(newUser.hashedPassword, undefined) //Can only check Password
      newUser.setPassword("123")
      assert.equal(newUser.checkPassword("123"), true) //Can only check Password
      assert.equal(newUser.regions[0], "NIC01");
    });
  });

  describe('Constructor', function () {
    it("Valid new User", function () {
      var newUser = new User(validUser2);
      assert.equal(newUser.firstName, 'Name');
      assert.equal(newUser.lastName, 'LastName');
      assert.equal(newUser.phoneNumber, '6507326291');
      assert.equal(newUser.checkPassword("123"), true) //Can only check Password
      assert.equal(newUser.regions[0], "NIC01");
    });
  });

  describe('Constructor', function () {
    it("Null User", function () {
      try {
        var newUser = new User(null);
        assert.fail();
      }
      catch(e) {
        assert.equal(newUser, undefined);
        assert.equal(e,"Object provided cannot be null.");
      }
    });
  });
  describe('Constructor', function () {
    it("Invalid Name", function () {
      try {
        var newUser = new User(invalidUser);
        assert.fail();
      }
      catch(e) {
        assert.equal(newUser, undefined);
        assert.equal(e,"Name cannot be null");
      }
    });
  });

  describe('Constructor', function () {
    it("Invalid Last Name", function () {
      try {
        var newUser = new User(invalidUser5);
        assert.fail();
      }
      catch(e) {
        assert.equal(newUser, undefined);
        assert.equal(e,"Lastname cannot be null");
      }
    });
  });


  describe('Constructor', function () {
    it("Null Phonenumber", function () {
      try {
        var newUser = new User(invalidUser2);
        assert.fail();
      }
      catch (e) {
        assert.equal(e, 'Invalid Phone');
        assert.equal(newUser, undefined);
      }
    })
  });

  describe('Constructor', function () {
    it("Invalid Phonenumber", function () {
      try {
        var newUser = new User(invalidUser3);
        assert.fail();
      }
      catch (e) {
        assert.equal(e, "Invalid Phone");
        assert.equal(newUser, undefined);
      }
    })
  });

  describe('Constructor', function () {
    it("Invalid Region", function () {
      try {
        var newUser = new User(invalidUser4);
        assert.fail();
      }
      catch (e) {
        assert.equal(e, "Invalid Region");
        assert.equal(newUser, undefined);
      }
    })
  });

  describe('HashedPassword Not Exposed', function () {
    describe('Constructor', function () {
      it("Valid Private User", function () {
        var newUser = new User(validUser);
        var json = newUser.toJson()
        assert.equal(json.hashedPassword, undefined) //Can only check Password
      });
    });
  });

  describe('HashedPassword Exposed', function () {
    describe('Constructor', function () {
      it("Valid Private User", function () {
        var newUser = new User(validUser);
        var json = newUser.toJson({exposed:true})
        assert.equal(json.hashedPassword, "oRWenfNnDVSdBFJFMmKfVHfOt97sm0XkfowAlQbsssg=") //Can only check Password
      });
    });
  });

  describe('Methods', function () {
    it("Set role", function () {
      try {
        var newUser = new User(validUser);
        assert.equal(newUser.roleLevel, 2);
        newUser.setRole(1);
        assert.equal(newUser.roleLevel, 1);
        newUser.setRole(0);
        assert.equal(newUser.roleLevel, false);
      }
      catch (e) {
        assert.fail();
      }
    });
  });
});