# 📧 Email Scheduler App - Second Prototype

## 🔹 Overview
The **ChronoMail** allows users to send emails to multiple recipients with a configurable delay between each sent email.  
This project was built using **React.js** for the frontend and **Node.js with Express.js** for the backend, with **Brevo SMTP (Sendinblue)** for email delivery.

---

## ⚡ Features
- ✅ Send emails to multiple recipients  
- ✅ Configure a delay between each email  
- ✅ Uses **Brevo SMTP** for secure email delivery  
- ✅ Simple, easy-to-use and responsive interface  

---

## 🚀 Installation Guide

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/ShubhamChandratre/ChronoMail.git
cd Prototype2
```

### **2️⃣ Setup the Backend (`email-server`)**
Navigate to the backend directory and install dependencies:
```sh
cd email-server
npm install
```
Create a `.env` file inside `email-server` and add the following content:
```env

PORT=
MONGO_URI=
JWT_SECRET=
BREVO_USER=
BREVO_PASS=
EMAIL_DELAY=
```
Replace `BREVO_USER` and `BREVO_PASS` with your **Brevo SMTP credentials**.

Start the backend:
```sh
nodemon server.js or 
node server.js
```

### **3️⃣ Setup the Frontend (`email-app`)**
Navigate to the frontend directory and install dependencies:
```sh
cd ../email-app
npm install
```
Start the frontend:
```sh
npm start
```
The app will be available at **http://localhost:3000/**.

---

## 🛠 **Technology Stack**
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Email Service:** Brevo SMTP  
- **Package Managers:** npm  

---

## 🐟 **License**
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 **Contributing**
Feel free to contribute by submitting **issues** or **pull requests**.


---
🚀 **Happy Coding!** 🎯

