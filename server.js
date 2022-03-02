const express = require('express');
const app = express();
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 3301

// middleware
app.use(express.static('public'));
app.use(express.json())

app.get ('/', (req, res) => {
    res.send('hello!');
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req,res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: provess.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_DESTINATION,
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.content
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent')
            res.send('success')
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});