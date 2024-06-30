const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rituanuragi1@gmail.com",
    pass: "geon ylan rgeq mfld",
  },
});

app.post("/send", (req, res) => {
  console.log("Request body:", req.body); // Log the request body to debug
  const { name, mobile } = req.body;
  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: "marketing@f2fintech.com",
    subject: `Contact Form Submission`,
    text: `You have a new applicant submission from:
        Name: ${name},
        Mobile: ${mobile}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
