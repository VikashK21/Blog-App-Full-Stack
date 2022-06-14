const nodemailer = require('nodemailer');
require('dotenv').config()

console.log(process.env.PORT);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const send_OTP = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verification OTP',
        text: `Hey, verify your account by OTP Code: ${otp}.`
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        else {
            console.log(info);
        }
    })
    return true;
}

module.exports = send_OTP;