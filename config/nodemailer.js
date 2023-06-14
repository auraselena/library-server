const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sasageyawn@gmail.com",
        pass: "mckyumujxmgtmwmt",
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;