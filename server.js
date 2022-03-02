// declaring requirements
const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
require('dotenv').config()

// port
const PORT = process.env.PORT || 3301

// middleware
app.use(express.static('public'));
app.use(express.json())

app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req,res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.user,
            clientId: '512796911201-gfqn9rhs9q2v1duqi0ic7aro85g5tt0l.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04SrEqkddhfFfCgYIARAAGAQSNwF-L9Ir6yDqYEaSMLowEsypfZRUqvSph-NNAZwRL4mMO03sq_52Kt9pAHLITw4fIAJDRHaeRcQ',
            accessToken: 'ya29.A0ARrdaM-vOTSt3Off7sMWMjB2iUK7IiQC8USPRciqiBfMo32cvuVFSpPxNSe6jNmFMCBAnwdl8l3Nr73ZFqJUsr66L412FrzXnDiaJEa1D-ogY7d7O2XuAJrk24smsSm9y-B_gDZOb2meg1VAbtPqY-SwNLKJ'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_DESTINATION,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
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