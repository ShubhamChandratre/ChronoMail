const mongoose = require("mongoose");

const EmailLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipients: [String], // ✅ Ensure correct field name
    subject: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmailLog", EmailLogSchema);
