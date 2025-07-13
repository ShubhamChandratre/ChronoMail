const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const EmailLog = require("./models/EmailLog");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB Error:", error));

// 🔹 Middleware: Verify JWT Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user; 
        console.log("Decoded User from JWT:", req.user); // ✅ Debugging
        next();
    });
};

// 🔹 Configure Brevo SMTP
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
});

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Secure `/send-emails` with JWT Authentication
app.post("/send-emails", authenticateToken, async (req, res) => {
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

            // 🔹 Save email log in MongoDB (Fixed field name)
            await EmailLog.create({
                user: req.user.userId,
                recipients: [emails[i]],
                subject: subject,
                message: message
            });

            await new Promise(resolve => setTimeout(resolve, delay));
        } catch (error) {
            console.error(`❌ Error sending to ${emails[i]}:`, error);
        }
    }

    res.json({ message: "Emails sent successfully!" });
});

// ✅ Get email logs (only for authenticated users)
app.get("/email-logs", authenticateToken, async (req, res) => {
    try {
        console.log("Fetching logs for user:", req.user.userId); // ✅ Debugging

        const logs = await EmailLog.find({ user: req.user.userId });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching email logs" });
    }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
