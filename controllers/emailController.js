const nodemailer = require("nodemailer");
const prisma = require("../config/prismaConfig");
const CryptoJS = require("crypto-js");

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send registration request
function sendRegistrationRequestEmail(req, res) {
  const {
    from_name,
    number,
    email,
    telephone,
    address,
    message,
  } = req.body;

  // Create the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Registration Request from ${from_name}`,
    text: `Here are the details we fetched for you:\n\nCompany Name: ${from_name}\nBusiness Registration Number: ${number}\nRegistered Address: ${address}\nHotline: ${telephone}\nBusiness Email: ${email}\nMessage: ${message}\n\nPlease look into it as soon as possible.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send registration request." });
    } else {
      res.status(200).json({
        message: "Registration request received. We will contact you soon.",
      });
    }
  });
}

// Function to send registration confirmation
function sendRegistrationConfirmationEmail(agentUsername) {
  // Fetch public user's contact information from the database
  prisma.agent
    .findUnique({ where: { agentUsername: agentUsername } })
    .then((currentAgent) => {
      if (currentAgent) {
        const hashedPassword = CryptoJS.AES.decrypt(
          currentAgent.agentPassword,
          process.env.PASSWORD_SECRET_KEY
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const contactInfo = {
          email: currentAgent.agentEmail,
          username: currentAgent.agentUsername,
          password: OriginalPassword,
          name: currentAgent.agentName,
        };
        // Send email using nodemailer
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: contactInfo.email,
          subject: "Registration Successful!",
          text: `Dear ${contactInfo.name},\n\n Your Application was accepted and verified. Your username and password are below.\n\n Username :  ${contactInfo.username}\n Password : ${contactInfo.password}\n\n Best Regards,\n Team Smart Tax`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching public user information:", err);
    });
}

module.exports = {
  sendRegistrationRequestEmail,
  sendRegistrationConfirmationEmail
};
