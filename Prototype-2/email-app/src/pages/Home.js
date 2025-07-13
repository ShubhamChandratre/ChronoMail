import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      {/* Large Banner Image */}
      <div className={styles.bannerContainer}>
        <img src="/images/home-banner.png" alt="Home Banner" className={styles.bannerImage} />
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <h2>Effortlessly Schedule Your Emails</h2>
        <p>
          Automate your email workflow with ease. Schedule emails to be sent at the right time,  
          attach important files, and manage your recipients seamlessly.
        </p>
        <button className={styles.ctaButton} onClick={() => navigate("/scheduler")}>
          Get Started
        </button>

        {/* Features Section */}
        <div className={styles.features}>
          <h2>Why Choose Email Scheduler?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>⏳ Set Delays</h3>
              <p>Control sending intervals between emails.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>📩 Bulk Sending</h3>
              <p>Send to multiple recipients effortlessly.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>🖼️ Attach Files</h3>
              <p>Send PDFs, images, and more with your emails.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>🔄 Email Automation</h3>
              <p>Save time by automating repetitive email tasks.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>🔒 Secure & Reliable</h3>
              <p>Ensures safe delivery with strong security measures.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>📊 Email Tracking</h3>
              <p>Monitor the status of sent emails with tracking features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
