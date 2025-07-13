import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Scheduler.module.css";

const EmailScheduler = () => {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(5);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  
  const navigate = useNavigate();

  // Redirect user if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    
    const token = localStorage.getItem("token");
    if (!token) {
      setResponse("❌ You must be logged in to send emails.");
      return;
    }

    const emailList = emails.split(",").map((email) => email.trim());
    if (emailList.length === 0 || !emailList[0]) {
      setResponse("❌ Please enter at least one valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/send-emails",
        {
          emails: emailList,
          subject,
          message,
          delay: delay * 1000, // Convert to milliseconds
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResponse(`✅ ${res.data.message}`);
      setEmails("");
      setSubject("");
      setMessage("");
      setDelay(5);
    } catch (error) {
      setResponse(error.response?.data?.message || "❌ Error sending emails.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Banner Image */}
      <div className={styles.bannerContainer}>
        <img src="/images/email-scheduler.png" alt="Email Scheduler" className={styles.bannerImage} />
      </div>

      <h2>Email Scheduler</h2>
      <p>Schedule emails easily by adding recipients, subject, and message.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Recipients (comma-separated emails):</label>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter emails separated by commas"
        />

        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter subject"
        />

        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter email message"
        />

        <label>Delay between emails (seconds):</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          min="1"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Emails"}
        </button>

        {response && <p className={styles.response}>{response}</p>}
      </form>
    </div>
  );
};

export default EmailScheduler;
