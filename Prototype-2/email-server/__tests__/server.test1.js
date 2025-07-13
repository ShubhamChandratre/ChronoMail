// const axios = require('axios');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const { exec } = require('child_process');

// dotenv.config();

// const baseURL = 'http://localhost:5000';
// let serverProcess;
// let token = '';

// const testUser = {
//   username: `testuser_${Date.now()}`,
//   email: `test${Date.now()}@mail.com`,
//   password: 'testpassword123'
// };

// beforeAll((done) => {
//   // Start the Express server before tests
//   serverProcess = exec('node server.js', (error, stdout, stderr) => {
//     if (error) console.error(`❌ Server Error: ${error.message}`);
//     if (stderr) console.error(`❗ Stderr: ${stderr}`);
//   });

//   // Wait for server to boot
//   setTimeout(() => {
//     console.log('✅ Test server ready');
//     done();
//   }, 3000); // wait 3 seconds
// });

// afterAll(() => {
//   // Kill server after tests
//   if (serverProcess) {
//     serverProcess.kill();
//     console.log('🛑 Server stopped');
//   }
// });

// describe('🚀 ChronoMail API Tests', () => {
//   test('📝 POST /auth/signup → Register new user', async () => {
//     const res = await axios.post(`${baseURL}/auth/signup`, testUser);
//     expect(res.status).toBe(201);
//     expect(res.data).toHaveProperty('message', 'User registered successfully');
//   });

//   test('🔑 POST /auth/login → Get JWT token', async () => {
//     const res = await axios.post(`${baseURL}/auth/login`, {
//       email: testUser.email,
//       password: testUser.password
//     });

//     expect(res.status).toBe(200);
//     expect(res.data).toHaveProperty('token');
//     token = res.data.token;
//   });

//   test('🔒 GET /email-logs without token → 401', async () => {
//     const res = await axios.get(`${baseURL}/email-logs`).catch(err => err.response);
//     expect(res.status).toBe(401);
//   });

//   test('📤 POST /send-emails with token → 200', async () => {
//     const res = await axios.post(`${baseURL}/send-emails`, {
//       emails: ['receiver@example.com'],
//       subject: 'Test Email',
//       message: 'This is a test email.',
//       delay: 100
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     expect(res.status).toBe(200);
//     expect(res.data).toHaveProperty('message', 'Emails sent successfully!');
//   });

//   test('📄 GET /email-logs with token → 200', async () => {
//     const res = await axios.get(`${baseURL}/email-logs`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.data)).toBe(true);
//   });
// });
