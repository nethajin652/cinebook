import React from 'react';
import { Modal } from './Modal';

export const TrailerModal = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${movieTitle || 'Movie'} – Official Trailer`} maxWidth="max-w-4xl">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
        {trailerUrl ? (
          <iframe
            src={`${trailerUrl}?autoplay=1&rel=0`}
            title={`${movieTitle} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Trailer preview not available
          </div>
        )}
      </div>
    </Modal>
  );
};
