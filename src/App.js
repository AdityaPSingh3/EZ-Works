import React, { useState } from "react";
import "./App.css";
import logo from "./logo.png"; // Replace with your logo file path

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://34.225.132.160:8002/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.status === 422) {
        setError(data.message || "An error occurred.");
      } else if (response.status === 200) {
        setMessage("Form Submitted");
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="EZ Works Logo" />
        <h1>Suite Of Business Support Services</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt...
        </p>
      </div>
      <div className="services">
        <div className="service-card">
          <h3>Presentation Design</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
        <div className="service-card">
          <h3>Audio - Visual Production</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
        <div className="service-card">
          <h3>Translation Services</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
        <div className="service-card">
          <h3>Graphic Design</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
        <div className="service-card">
          <h3>Research & Analytics</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
        <div className="service-card">
          <h3>Data Processing</h3>
          <p>
            Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Contact Me"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
