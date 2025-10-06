import React, { useState } from 'react';
import './App.css';
import initialPhotos from './dane';

// Dynamically import images
const images = {};
function importAll(r) {
  r.keys().forEach((key) => (images[key.replace('./', '')] = r(key)));
}
importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));


function App() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [filters, setFilters] = useState({
    kwiaty: true,
    zwierzeta: true,
    samochody: true,
  });

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleDownload = (id) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, downloads: photo.downloads + 1 } : photo
      )
    );
  };

  const filteredPhotos = photos.filter((photo) => {
    if (filters.kwiaty && photo.category === 1) return true;
    if (filters.zwierzeta && photo.category === 2) return true;
    if (filters.samochody && photo.category === 3) return true;
    return false;
  });

  return (
    <div className="App">
      <h1>Kategorie zdjęć</h1>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            name="kwiaty"
            checked={filters.kwiaty}
            onChange={handleFilterChange}
          />
          Kwiaty
        </label>
        <label>
          <input
            type="checkbox"
            name="zwierzeta"
            checked={filters.zwierzeta}
            onChange={handleFilterChange}
          />
          Zwierzęta
        </label>
        <label>
          <input
            type="checkbox"
            name="samochody"
            checked={filters.samochody}
            onChange={handleFilterChange}
          />
          Samochody
        </label>
      </div>
      <div className="gallery">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="photo-block">
            <img src={images[photo.filename]} alt={photo.alt} />
            <h4>Liczba pobrań: {photo.downloads}</h4>
            <button onClick={() => handleDownload(photo.id)}>Pobierz</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;