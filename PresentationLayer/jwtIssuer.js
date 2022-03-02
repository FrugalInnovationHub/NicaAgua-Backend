var jwt = require('jsonwebtoken');
const tokenKey = require('./../config.json').tokenKey;
class JwtIssuer{
    constructor(){

    }

    /**
     * Generates a Token for user, token will be valid for one hour.
     * @param {*} roleLevel Role Level of the user requesting the Token
     * @param {*} phoneNumber User's phoneNumber
     * @returns {string} Json Web Token
     */
    static generateToken(roleLevel,phoneNumber){
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {roleLevel,phoneNumber}
          }, tokenKey);
    }

    /**
     * Generates a new token based on another token. This method must be called before original token expires.
     * @param {*} token 
     * @returns {string} New Token
     */
    static renovateToken(token){
        token = extractTokenFromHeader(token);
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: jwt.verify(token).data
          }, tokenKey);
    }

    /**
     * 
     * @param {*} token 
     * @returns {boolean} True if Token is valid
     */
    static isTokenValid(token){
        try{
            token = extractTokenFromHeader(token);
            jwt.verify(token,tokenKey)
            return true
        }
        catch{
            return false;
        }
    }


    /**Extracts phone number from Token */
    static getUserPhoneNumber(token){
        try{
            token = extractTokenFromHeader(token);
            return jwt.verify(token,tokenKey).data.phoneNumber;
        }
        catch{
            throw "Invalid Token"
        }
    }
    /**
     * Extracts userRole from token
     * @param {*} token 
     * @returns 
     */
    static getUserRole(token){
        try{
            token = extractTokenFromHeader(token);
            return jwt.verify(token,tokenKey).data.roleLevel
        }
        catch{
            throw "Invalid Token"
        }
    }

    /**
     * Extracts token from Header, usually the token comes in the following format:
     * "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDYxNjMwMTQsImRhdGEiOnsicm9sZUxldmVsIjoyLCJwaG9uZU51bWJlciI6IjcifSwiaWF0IjoxNjQ2MTU5NDE0fQ.syA2r6qrQcVEUl0KD31PaaG-TKlMt5DrdLi_nWXGUcg"
     * 
     * This method removes the "Bearer " prefix
     * @param {*} token 
     * @returns 
     */
    
}

extractTokenFromHeader = function(token){
    if( token.indexOf("Bearer ") >= 0)
        return token.substring(7);
    return token
}
module.exports = JwtIssuer;
