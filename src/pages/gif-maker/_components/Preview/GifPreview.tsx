interface GifPreviewProps {
  images: Array<string>
  width: number;
  height: number;
  animationSpeed: number;
}

const GifPreview = ({ images = [], width, height, animationSpeed }: GifPreviewProps) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px`
    , overflowY: 'hidden'
     }}>
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Animation Frame ${index}`}
          style={{
            animation: `changeImage ${images.length / animationSpeed}s ${index * (1 / animationSpeed)}s infinite`,
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
        />
      ))}
      <style jsx>{`
      @keyframes changeImage {
        ${Array.from({ length: images.length }, (_, i) => `
          ${100 / images.length * i}% { display: none }
        `).join('')}
      }
    `}</style>
    </div>
  );
};

export default GifPreview;