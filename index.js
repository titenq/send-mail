require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

const port = process.env.PORT || 3000;
const user = process.env.USER_SMTP;
const pass = process.env.PASS_SMTP;
const serviceSMTP = process.env.SERVICE_SMTP;
const email = process.env.EMAIL;
const sendToEmail = process.env.SEND_TO_EMAIL;

app.get('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    // host: 'host SMTP',
    // port: 'port SMTP',
    service: serviceSMTP,
    secure: false,
    auth: {
      user,
      pass
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let htmlContent = `
<h1>e-mail recebido com sucesso!</h1>
<hr>
`;

  const mailOptions = {
    from: email,
    to: sendToEmail,
    subject: 'SITE: e-mail de recuperação de senha.',
    html: htmlContent
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.send(info);
    }
  });
});

app.listen(port, () => console.log(`App running on port ${port}!`));
