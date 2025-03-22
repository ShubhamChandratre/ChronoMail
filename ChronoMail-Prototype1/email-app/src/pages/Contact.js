import React from "react";
import styles from "../styles/Page.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <img src="/images/contact-us.jpg" alt="Contact Us" className={styles.image} />
      <h2>Contact Us</h2>
      <p>
        Have questions or need support? We're here to help! Reach out to me on LinkedIn or Instagram.
      </p>
      <p>
        📧 **Email:** chandratreshubham@gmail.com<br />
        🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/shubham-chandratre-a03819257/" target="_blank" rel="noopener noreferrer">Shubham Chandratre</a><br />
        📸 **Instagram:** <a href="https://www.instagram.com/shubham_chandratre_" target="_blank" rel="noopener noreferrer">@shubham</a>
      </p>
    </div>
  );
};

export default Contact;
