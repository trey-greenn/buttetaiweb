// // app/components/PerlinForest.tsx
// import React, { useEffect, useRef, useState } from 'react';

// const PerlinForest: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [animating, setAnimating] = useState(true);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Initialize the PerlinForest class here
//     const forest = new PerlinForestClass(ctx);

//     const animate = () => {
//       if (animating) {
//         forest.animate();
//       }
//       requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       // Cleanup if necessary
//     };
//   }, [animating]);

//   const toggleAnimation = () => {
//     setAnimating(!animating);
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} id="canvas"></canvas>
//       <div className="controls">
//         <div>🌲 Perlin Forest Generator</div>
//         <button onClick={() => forest.reset()}>New Forest</button>
//         <button onClick={toggleAnimation}>Pause/Play</button>
//         <button onClick={() => forest.addTree()}>Add Tree</button>
//       </div>
//       <div className="info">
//         Click anywhere to plant a new tree<br />
//         Watch the organic growth patterns
//       </div>
//     </div>
//   );
// };

// export default PerlinForest;