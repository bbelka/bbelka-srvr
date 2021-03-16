require('dotenv').config();
const router = require('express').Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


router.post("/", async function (req, res) {
    try {
        const OAuth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://localhost:3000/contact"
            // "https://bbelka.herokuapp.com/contact"
        );

        OAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {

            OAuth2Client.getAccessToken((err, token) => {

                if (err) {
                    reject("failed to create access token");
                }
                resolve(token);
            })
        });

        const transport = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GOOGLE_ORIGINATION_ADDRESS,
                accessToken:accessToken,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                
            }
        }

        const transporter = nodemailer.createTransport(transport);
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;
        const content = `name: ${name} \n email: ${email} \n message : ${message} `;

        let mail = {
            from: name,
            to: process.env.GOOGLE_DESTINATION_ADDRESS,
            subject: 'Contact from portfolio',
            text: content
        };

        transporter.sendMail(mail, (err, info) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                console.log('Email sent: ' + info.response);
                res.json('Email sent: ' + info.response);
            }
            transporter.close();
        });
    } catch (err) {
        if (err) {
            console.log(err);

        }
    }
});

module.exports = router;