import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user details
        const userRes = await axios.get("http://localhost:5000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data); // Assuming API returns { username: "JohnDoe" }

        // Fetch email logs
        const logsRes = await axios.get("http://localhost:5000/email-logs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(logsRes.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : !user ? (
        <div>
          <h2>Login or Signup</h2>
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.username}</h2>
          <button onClick={handleLogout}>Logout</button>
          
          <h3>Email Logs</h3>
          {logs.length > 0 ? (
            <ul>
              {logs.map((log) => (
                <li key={log._id}>
                  {log.recipients?.join(", ")} - {log.subject}
                </li>
              ))}
            </ul>
          ) : (
            <p>No email logs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
