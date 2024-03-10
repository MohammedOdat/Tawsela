const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohammed.a.odatt@gmail.com",
      pass: "anvt elxu fkkr lkih",
    },
  });

  const mailOptions = {
    from: "mohammed.a.odatt@gmail.com",
    to: "mohammed.a.odatt@gmail.com",
    subject: "Completed Order Message ",
    text: "Thanks for using our Application",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  sendEmail,
};
