// pages/editor.tsx
import { useState } from 'react';
import styles from '../styles/editor.module.css';

export default function Editor() {
    const [title, setTitle] = useState('');
    const [bgColor, setBgColor] = useState('#000000');
    const [imageUrls, setImageUrls] = useState < string[] > (['']);
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = value;
        setImageUrls(updatedUrls);
    };

    const handleGenerateThumbnail = () => {
        const images = imageUrls.filter(url => url.trim()).join(',');
        const generatedUrl = `/api/thumbnail.png?title=${encodeURIComponent(title)}&bg=${bgColor}&images=${encodeURIComponent(images)}`;
        setThumbnailUrl(generatedUrl);
    };

    return (
        <div className={styles.container}>
      <h1 className={styles.h1}>Thumbnail Editor</h1>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">Title:</label>
        <input
        className={styles.intext}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter thumbnail title"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="bgColor">Background Color:</label>
        <input
        className={styles.incolor}
          type="color"
          id="bgColor"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Images (URLs):</label>
        {imageUrls.map((url, index) => (
          <div key={index} className={styles.imageGroup}>
            <input
            className={styles.intext}
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              placeholder="Enter image URL"
            />
            <button onClick={() => handleAddImageUrl()}>Add</button>
          </div>
        ))}
      </div>

      <button className={styles.generateButton} onClick={handleGenerateThumbnail}>
        Generate Thumbnail
      </button>

      {thumbnailUrl && (
        <div className={styles.preview}>
          <h2>Thumbnail Preview:</h2>
          <img src={thumbnailUrl} alt="Thumbnail Preview" className={styles.thumbnailImage} />
          <p>Generated URL: <a href={thumbnailUrl} target="_blank" rel="noopener noreferrer">{thumbnailUrl}</a></p>
        </div>
      )}
    </div>
    );
}