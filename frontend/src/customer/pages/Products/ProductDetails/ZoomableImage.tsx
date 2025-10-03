import React, { useState } from 'react';

const ZoomableImage = ({ src, alt }: { src: string, alt: string }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showZoom, setShowZoom] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const img = e.currentTarget.querySelector('img');
        if (img) {
            setImageSize({ width: img.offsetWidth, height: img.offsetHeight });
            setShowZoom(true);
        }
    };

    const handleMouseLeave = () => {
        setShowZoom(false);
    };

    return (
        <div
            className="relative overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={src} alt={alt} className="w-full h-auto object-cover" />
            {showZoom && (
                <div
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                        width: `${imageSize.width * 2}px`,
                        height: `${imageSize.height * 2}px`,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imageSize.width * 2}px ${imageSize.height * 2}px`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        opacity: 1,
                        transition: 'opacity 0.2s',
                    }}
                ></div>
            )}
        </div>
    );
};

export default ZoomableImage;