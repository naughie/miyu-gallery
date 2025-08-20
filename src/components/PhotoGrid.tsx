import { useState } from "react";

import Photo from "./Photo";

interface Props {
  songTitle: string;
  imageUrls: string[];
}

const PhotoGrid = ({ songTitle, imageUrls }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (imageUrls.length === 0) {
    return null;
  }

  const openLightbox = (url: string) => setSelectedImage(url);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="p-4 md:p-6 mb-8">
      <h2 className="text-2xl md:text-3xl text-center text-dark-pink font-bold mb-6">
        - {songTitle} -
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <Photo
            key={url}
            url={url}
            alt={`${songTitle} ${index + 1}`}
            onClick={() => openLightbox(url)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative p-2 bg-custom-white rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Selected Oshi"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 bg-dark-pink text-white rounded-full w-10 h-10 text-xl font-bold"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
