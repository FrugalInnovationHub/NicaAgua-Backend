var UserService = require('../../DomainLayer/Services/userService');
const JwtIssuer = require('../jwtIssuer');
const PermissionMiddleWare = require('../permissionMiddleWare')

const { SendOTPMessageCommand, VerifyOTPMessageCommand, PinpointClient} = require("@aws-sdk/client-pinpoint");
const crypto = require('crypto');

// Function to generate reference ID
function generate_ref_id(destinationNumber, brandName, source) {
    let refId = brandName + source + destinationNumber;
    return crypto.createHash('md5').update(refId).digest("hex");
}

// Function to reset user password
async function resetPassword(phoneNumber, newPassword) {
    let userService = new UserService();
    let user = await userService.getUser(phoneNumber);
    let status = await user.setPassword(newPassword);
    if (status) {
        return true;
    } else {
        return false;
    }
}

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

    app.post('/user/otp/request', async (req, res) => {
        // Fetch data from request body
        const destinationNumber = req.body.mobile;

        const originationNumber = process.env.ORIGINATION_NUMBER;
        const projectId = process.env.PROJECT_ID;
        const brandName = "NicaAgua";
        const otp_len = 5;

        // Specify the parameters to pass to the API.
        let params = {
            ApplicationId: projectId,
            SendOTPMessageRequestParameters: {
                Channel: "SMS",
                BrandName: brandName,
                CodeLength: otp_len,
                ValidityPeriod: 20,
                AllowedAttempts: 5,
                OriginationIdentity: originationNumber,
                DestinationIdentity: destinationNumber,
                ReferenceId: generate_ref_id(destinationNumber, brandName, "ResetPass")
            }
        };

        const REGION = process.env.AWS_REGION;
        const pinClient = new PinpointClient({region: REGION});

        try {
            const data = await pinClient.send(new SendOTPMessageCommand(params));
            // console.log("Message sent! " + data["MessageResponse"]["Result"][destinationNumber]["StatusMessage"]);
            res.status(200).json({ message: "OTP sent" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error sending OTP" });
        }
    });

    app.post('/user/otp/verify', async (req, res) => {
        // Fetch data from request body
        const destinationNumber = req.body.mobile;
        const otp = req.body.otp;

        const projectId = process.env.PROJECT_ID;
        const brandName = "NicaAgua";

        let params = {
            ApplicationId: projectId,
            VerifyOTPMessageRequestParameters: {
                DestinationIdentity: destinationNumber,
                ReferenceId: generate_ref_id(destinationNumber, brandName, "ResetPass"),
                Otp: otp
            }
        };

        const REGION = process.env.AWS_REGION;
        const pinClient = new PinpointClient({region: REGION});

        try {
            const data = await pinClient.send(new VerifyOTPMessageCommand(params));
            // console.log("OTP verified! " + JSON.stringify(data));
            if(data.VerificationResponse.Valid) {
                let status = await resetPassword(destinationNumber, req.body.new_password);
                if(status) {
                    res.status(200).json({message: "OTP verification completed"});
                } else {
                    res.status(500).json({ message: "Error resetting password" });
                }
            } else {
                res.status(500).json({ message: "Error verifying OTP" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error verifying OTP" });
        }
    });

}

module.exports = UserController;