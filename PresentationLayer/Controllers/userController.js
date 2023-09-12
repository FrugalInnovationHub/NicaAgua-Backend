var UserService = require('../../DomainLayer/Services/userService');
const JwtIssuer = require('../jwtIssuer');
const PermissionMiddleWare = require('../permissionMiddleWare')

function UserController(app) {
    app.delete('/user', PermissionMiddleWare.isAdminOrSelf, (req, res) => {
        new UserService().deleteUser(req.body.phoneNumber).then(
            (r) => res.send(r))
            .catch((e) => {
                res.statusCode = 400;
                res.send(e);
            });
    })

    app.put('/user', (req, res) => {
        new UserService().addUser(req.body).then(
            (r) => res.send(r))
            .catch((e) => {
                res.statusCode = 400;
                res.send(e);
            });
    })

    app.get('/user', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            phoneNumber = JwtIssuer.getUserPhoneNumber(req.headers.authorization)
            new UserService().getUser(phoneNumber).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.get('/users', PermissionMiddleWare.isAdmin, (req, res) => {
        try {
            new UserService().getAllUsers().then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.post('/user/login', (req, res) => {
        try {
            new UserService().logIn(req.body).then(
                (r) => res.send(JwtIssuer.generateToken(r.roleLevel, r.phoneNumber)))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.post('/admin/user/login', (req, res) => {
        try {
            new UserService().logIn(req.body).then(
                (r) => {
                    if(r.roleLevel == 0) {
                        res.send(JwtIssuer.generateToken(r.roleLevel, r.phoneNumber))
                    }
                    else {
                        res.statusCode = 403
                        res.send("User is not an Admin User!")
                    }
                })
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.post('/user/community', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            var phoneNumber = JwtIssuer.getUserPhoneNumber(req.headers.authorization)
            new UserService().setDefaultCommunity({ community: req.body, phoneNumber }).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.post('/user/role', PermissionMiddleWare.isRootUser, (req, res) => {
        try {
            new UserService().setRole(req.body).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })
}

module.exports = UserController;