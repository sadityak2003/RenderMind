import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import "./styles.css";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
