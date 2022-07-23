const JwtIssuer = require("./jwtIssuer");
/**
 * Security Middleware
 * @summary This class implements security methods to validate User's login and role.
 */
class PermissionMiddleWare{
    /**
     * @summary This method verify if Token on header was issued to a Admin User or a Root User
     * @param {*} req HTTP Request 
     * @param {*} res HTTP Response
     * @param {*} next Calback Function
     */
    static isAdmin(req,res,next){
        var role = JwtIssuer.getUserRole(req.headers.authorization);

        if( role in [0,1]){
            next();
        }
        else{
            res.statusCode = 401;
            res.end();
        }
    }

    /**
     * @summary This method verify if Token on header was issued to a Root User
     * @param {*} req HTTP Request 
     * @param {*} res HTTP Response
     * @param {*} next Calback Function
     */
     static isRootUser(req,res,next){
        if( JwtIssuer.getUserRole(req.headers.authorization)== 0)
            next();
        else{
            res.statusCode = 401;
            res.end();
        }
    }
    
    /**
     * This method verify if the request has a valid Token on its headers.
     * @summary Verify if Token is valid
     * @param {*} req HTTP Request 
     * @param {*} res HTTP Response
     * @param {*} next Calback Function
     */
    static isAuthenticated(req,res,next){
        if(JwtIssuer.isTokenValid(req.headers.authorization))
            next();
        else{
            res.statusCode = 401;
            res.end();
        }
    }
}


module.exports = PermissionMiddleWare;