import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <h2>Welcome</h2>
        <nav>
          <ul>
            <li><Link to="/signup" className="btn-home">Sign Up</Link></li>
            <li><Link to="/login" className="btn-home">Login</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
