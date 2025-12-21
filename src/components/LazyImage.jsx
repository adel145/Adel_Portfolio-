import React, { useEffect, useState, useRef } from 'react';

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`} {...props}>
      {isLoaded ? (
        <img 
          src={src} 
          alt={alt} 
          className={className}
          loading="lazy"
        />
      ) : (
        <div className="lazy-image-placeholder" />
      )}
    </div>
  );
};

export default LazyImage;
