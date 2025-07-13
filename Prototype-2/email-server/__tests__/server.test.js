const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

dotenv.config();

let serverProcess;

beforeAll((done) => {
  // Start your server before tests run
  serverProcess = spawn('node', ['server.js']); // adjust if path is different

  serverProcess.stdout.on('data', (data) => {
    if (data.toString().includes('Server running')) {
      done();
    }
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`);
  });
}, 10000); // extended timeout for server start

afterAll(() => {
  // Clean up: stop server after tests
  if (serverProcess) serverProcess.kill();
});

describe('🚀 Server Route Tests', () => {
  const baseURL = 'http://localhost:5000';
  const testToken = jwt.sign({ userId: 'test-user-id' }, process.env.JWT_SECRET);

  test('🔒 GET /email-logs without token → 401', async () => {
    const res = await axios.get(`${baseURL}/email-logs`).catch(err => err.response);
    expect(res.status).toBe(401);
    expect(res.data.message).toMatch(/Access Denied/i);
  });

  test('✅ GET /email-logs with valid token → 200 or 500', async () => {
    const res = await axios.get(`${baseURL}/email-logs`, {
      headers: { Authorization: `Bearer ${testToken}` }
    }).catch(err => err.response);

    expect([200, 500]).toContain(res.status);
  });

  test('📧 POST /send-emails with dummy payload → 200 or 500', async () => {
    const payload = {
      emails: ['test@example.com'],
      subject: 'Test Subject',
      message: 'Hello from test!',
      delay: 0
    };

    const res = await axios.post(`${baseURL}/send-emails`, payload, {
      headers: { Authorization: `Bearer ${testToken}` }
    }).catch(err => err.response);

    expect([200, 500]).toContain(res.status);
  });
});





// netstat -aon | findstr :5000
// taskkill /PID <PID> /F