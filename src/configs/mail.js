const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "3e81acf9ea4f64", // generated ethereal user
    pass: "93a1848bb8aa1f", // generated ethereal password
  },
});
