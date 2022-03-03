// declaring requirements
const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()

// port
const PORT = process.env.PORT || 3301

// middleware
app.use(express.static('public'));
app.use(express.json())

// env variables
const user = process.env.USER
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLEINTSECRET;
const redirectURI = 'https://developers.google.com/oauthplayground';
const refreshToken = process.env.REFRESHTOKEN;
const destination = process.env.DESTINATION

// Token refresher
const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectURI
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req,res) => {
    console.log(req.body);
    console.log(process.env.user);
    console.log(process.env.clientId);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.user,
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            refreshToken: process.env.refreshToken,
            accessToken: process.env.accessToken,
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.destination,
        subject: `Message from ${req.body.name} at ${req.body.email}: ${req.body.subject}`,
        text: req.body.content
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error at .sendMail');
        } else {
            console.log('Email sent')
            res.send('success')
        }
    });

    transporter.on('token', token => {
        console.log('A new access token was generated');
        console.log('User: %s', token.user);
        console.log('Access Token: %s', token.accessToken);
        console.log('Expires: %s', new Date(token.expires));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});