import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { useState } from "react";
export function Home() {
  const { instance } = useMsal();
  const [testUrl, setTestUrl] = useState("");
  const [testUrlResponse, setTestUrlResponse] = useState("");


  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error("Login failed:", e);
    });
  };

  const handleTestUrl = () => {
    fetch(testUrl)
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          return response.text().then(text => `401 Unauthorized: ${text}`);
        }
        return response.json();
      })
      .then(data => {
        if (typeof data === 'string') {
          setTestUrlResponse(data);
        } else {
          setTestUrlResponse(JSON.stringify(data, null, 2));
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setTestUrlResponse(`Error: ${error.message}`);
      })
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our App</h1>
      <button onClick={handleLogin}>
        Sign in with Microsoft
      </button>
      <input type="text" placeholder="test url without auth" value={testUrl} onChange={(e) => setTestUrl(e.target.value)} />
      <button onClick={handleTestUrl}>Test URL</button>
      <p>{testUrlResponse}</p>
    </div>
  );
} 