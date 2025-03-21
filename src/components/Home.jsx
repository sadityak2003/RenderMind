import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const generateImage = async () => {
    setLoading(true); // Start loading
    setImage(null); // Clear previous image

    try {
      const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        { prompt },
        {
          headers: {
            "x-api-key": process.env.REACT_APP_CLIPDROP_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error.response?.data || error);
    }

    setLoading(false); // Stop loading
  };

  const downloadImage = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "generated_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="home">
      <h2 className="headline">Crafting your thoughts into reality</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage}>Generate</button>
      </div>

      {/* Show the loading spinner when generating an image */}
      {loading && <div className="loader"></div>}

      {image && (
        <div className="image-container">
          <img src={image} alt="Generated" />
          <div className="buttons">
            <button onClick={generateImage}>Regenerate</button>
            <button onClick={downloadImage}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
