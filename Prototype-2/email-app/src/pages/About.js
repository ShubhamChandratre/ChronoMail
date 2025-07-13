import React from "react";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <img src="/images/about-us.png" alt="About Us" className={styles.image} />
      <h2>About ChronoMail</h2>

      <div className={styles.box}>
        <h3>📌 About Us</h3>
        <p>
          **ChronoMail** is an innovative technology company dedicated to simplifying and optimizing email scheduling.  
          Our flagship product, the **Email Scheduler App**, allows users to schedule emails with a **custom delay**,  
          ensuring timely and efficient communication.
        </p>
      </div>

      <div className={styles.box}>
        <h3>🌍 Our Mission</h3>
        <p>
          To empower businesses and individuals with **seamless, automated, and reliable email scheduling solutions**  
          that enhance productivity and streamline communication.
        </p>
      </div>

      <div className={styles.box}>
        <h3>🚀 Our Vision</h3>
        <p>
          We envision a future where **email automation is effortless**, eliminating the need for manual reminders  
          and missed opportunities. Our goal is to make **ChronoMail** the go-to platform for smart email scheduling.
        </p>
      </div>

      <div className={styles.box}>
        <h3>📧 Why Choose Us?</h3>
        <ul>
          <li>🔹 **Smart Scheduling** – Pick the perfect date & time for your emails.</li>
          <li>🔹 **Time-Saving Automation** – Reduce manual email efforts with automated workflows.</li>
          <li>🔹 **User-Friendly Interface** – Designed for simplicity and efficiency.</li>
          <li>🔹 **Reliable & Secure** – Ensuring data privacy and secure email delivery.</li>
        </ul>
      </div>

      <div className={styles.box}>
        <h3>📞 Get in Touch</h3>
        <p>
          Whether you're an individual, a business, or a large enterprise, **ChronoMail** is here to support  
          your email scheduling needs. Contact us today and take the first step towards **smarter email management**!
        </p>
      </div>
    </div>
  );
};

export default About;
