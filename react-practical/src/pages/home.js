import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <nav>
        <ul>
          <li><Link to="/signup"> signUp</Link></li>
          <li><Link to="/login"> Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
