import React from "react";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">RenderMind</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/chat">Chat</a>
      </div>
    </nav>
  );
};

export default Navbar;
