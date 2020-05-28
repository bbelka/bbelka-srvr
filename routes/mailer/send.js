const router = require('express').Router();
// const transporter = require('../../config/mailer')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();


router.post("/", function (req, res) {
    try {
        const OAuth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://localhost:3000/contact"
        );

        OAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });
        const accessToken = OAuth2Client.getAccessToken()

        const transport = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "bbelka.portfolio@gmail.com",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken
            }
        }

        const transporter = nodemailer.createTransport(transport);

        // transporter.verify((error, success) => {
        //     if (error) {
        //         console.log('verify error',error);

        //     } else {
        //         console.log('Mailer ready');

        //     }
        // });

        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;
        const content = `name: ${name} \n email: ${email} \n message : ${message} `;
        console.log(name);
        console.log(email);
        console.log(message);
        console.log(content);

        let mail = {
            from: name,
            to: 'bbelka@gmail.com',
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