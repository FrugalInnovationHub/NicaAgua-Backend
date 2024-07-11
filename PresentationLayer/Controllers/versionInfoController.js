
const axios = require("axios");
const moment = require("moment");
require('dotenv').config();

function getBranchInfo(){   
    return new Promise((resolve,reject) => {
        axios.get("https://api.github.com/repos/FrugalInnovationHub/NicaAgua-Backend/branches/main").then(resp => {
            resolve(resp.data);
        });
    });
}



function buildHTML(data){
    const date = moment(data.commit.commit.author.date).format("MMM DD YYYY; HH:mm:ss");
    const html = `<html>
        <head>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Version Info</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Branch</th>
                        <td><a href=${data.commit.html_url}>${data.name}</a></td>
                    </tr>

                    <tr>
                        <th>Environment</th>
                        <td><b> ${process.env.ENVIRONMENT} </b></td>
                    </tr>
                    <tr>
                        <th>Date Commited</th>
                        <td>${date}</td>
                    </tr>
                    <tr>
                        <th>Author</th>
                        <td>${data.commit.commit.author.name}</td>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <td>${data.commit.commit.message}</td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>`;
    return html;
}
function VersionInfoController(app) {
    app.get('/version', (req, res) => {
        getBranchInfo().then(
            (r) => res.send(buildHTML(r)))
            .catch((e) => { 
                res.statusCode = 400;
                res.send(e.message);
            });
    });
}

module.exports = VersionInfoController;
