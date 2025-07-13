import React, { useState } from "react";
import axios from "axios";

const EmailSender = () => {
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [delay, setDelay] = useState(5); // Default delay of 5 seconds
    const [status, setStatus] = useState("");

    const addEmail = () => {
        if (emailInput.trim() && !emails.includes(emailInput)) {
            setEmails([...emails, emailInput]);
            setEmailInput("");
        }
    };

    const removeEmail = (email) => {
        setEmails(emails.filter((e) => e !== email));
    };

    const sendEmails = async () => {
        if (emails.length === 0 || !subject || !message) {
            setStatus("Please fill all fields!");
            return;
        }

        setStatus("Sending emails...");
        try {
            await axios.post("http://localhost:5000/send-emails", {
                emails,
                subject,
                message,
                delay,
            });
            setStatus("Emails sent successfully!");
        } catch (error) {
            setStatus("Error sending emails.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h2>Email Sender</h2>
            <input
                type="text"
                placeholder="Enter email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            />
            <button onClick={addEmail}>Add</button>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>
                        {email} <button onClick={() => removeEmail(email)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input
                type="number"
                placeholder="Delay (seconds)"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
            />
            <button onClick={sendEmails}>Send Emails</button>
            <p>{status}</p>
        </div>
    );
};

export default EmailSender;
