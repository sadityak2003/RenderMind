import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage(null);

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

    setLoading(false);
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
      <h2 className="headline">Crafting your thoughts into reality.</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage}>Generate</button>
      </div>

      <div className="image-container">
        {loading ? (
          <div className="image-holder">
          <div className="loader"></div>
        </div>
        ) : image ? (
          <img src={image} alt="Generated" className="image"/>
        ) : (
          <div className="image-holder">
            <p className="image-holder-text">Your image will be displayed here</p>
          </div>
        )}
      </div>

      {image && (
          <div className="buttons">
            <button onClick={generateImage}>Regenerate</button>
            <button onClick={downloadImage}>Download</button>
          </div>
        
      )}
    </div>
  );
};

export default Home;
