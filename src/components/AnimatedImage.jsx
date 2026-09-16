import React, { useState } from 'react';

const AnimatedImage = ({ src, alt, style = {}, className = '', caption = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    setIsOpen(true);
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`animated-img-container ${className}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius: style.borderRadius || '8px',
          display: 'inline-block',
          width: style.width || '100%',
          height: style.height || 'auto',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          transform: isClicked ? 'scale(0.96) rotate(1deg)' : 'scale(1)',
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = style.boxShadow || 'none';
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: style.objectFit || 'cover',
            display: 'block',
            transition: 'transform 0.6s ease, filter 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
        
        {/* Click hint overlay icon */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          pointerEvents: 'none'
        }}>
          🔍 Phóng to
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#333',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 10000
            }}
          >
            ✕
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '80vh',
              position: 'relative',
              animation: 'zoomIn 0.3s ease'
            }}
          >
            <img 
              src={src} 
              alt={alt} 
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                objectFit: 'contain'
              }}
            />
            {(caption || alt) && (
              <p style={{ 
                color: 'white', 
                textAlign: 'center', 
                marginTop: '1rem', 
                fontSize: '1.1rem',
                fontFamily: 'var(--font-serif)',
                background: 'rgba(0,0,0,0.4)',
                padding: '0.5rem 1rem',
                borderRadius: '20px'
              }}>
                {caption || alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedImage;
