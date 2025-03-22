import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>📧 ChronoMail</h2>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/scheduler" className={styles.link}>Scheduler</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
