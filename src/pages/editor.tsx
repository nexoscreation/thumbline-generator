import { useState } from 'react';
import styles from '../styles/editor.module.css';

export default function Editor() {
  // State to store form input values
  const [title, setTitle] = useState('Sample Title');
  const [logo, setLogo] = useState('');
  const [bgColor, setBgColor] = useState('#121214');

  // Function to generate the URL for the thumbnail
  const generateThumbnailUrl = () => {
    const baseUrl = '/api/thumbnail.png';
    const params = new URLSearchParams({
      title: encodeURIComponent(title),
      images: encodeURIComponent(logo),
      bg: encodeURIComponent(bgColor)
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Thumbnail Generator Editor</h1>

      <div className={styles.form}>
        {/* Input for title */}
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter thumbnail title"
          />
        </div>

        {/* Input for logo URL */}
        <div className={styles.inputGroup}>
          <label htmlFor="logo">Logo URL</label>
          <input
            type="text"
            id="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="Enter logo image URL (optional)"
          />
        </div>

        {/* Input for background color */}
        <div className={styles.inputGroup}>
          <label htmlFor="bgColor">Background Color (Hex)</label>
          <input
            type="color"
            id="bgColor"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>

      {/* Generated URL */}
      <div className={styles.urlSection}>
        <h2>Generated URL:</h2>
        <code className={styles.generatedUrl}>
          {generateThumbnailUrl()}
        </code>
      </div>

      {/* Preview of the thumbnail */}
      <div className={styles.previewSection}>
        <h2>Thumbnail Preview:</h2>
        <img
          src={generateThumbnailUrl()}
          alt="Thumbnail Preview"
          className={styles.thumbnailPreview}
        />
      </div>
    </div>
  );
}
