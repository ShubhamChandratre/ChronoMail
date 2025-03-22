const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Brevo SMTP settings
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
});

transporter.verify((error, success) => {
    if (error) console.error("SMTP Connection Error:", error);
    else console.log("✅ Brevo SMTP is ready!");
});

app.post("/send-emails", async (req, res) => {
    const { emails, subject, message, delay } = req.body;

    for (let i = 0; i < emails.length; i++) {
        try {
            await transporter.sendMail({
                from: `"Shubham" <chandratreshubham@gmail.com>`,
                to: emails[i],
                subject: subject,
                text: message
            });

            console.log(`📧 Email sent to ${emails[i]}`);
            await new Promise(resolve => setTimeout(resolve, delay));
        } catch (error) {
            console.error(`❌ Error sending to ${emails[i]}:`, error);
        }
    }

    res.json({ message: "Emails sent successfully!" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
