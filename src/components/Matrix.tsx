import React, { useRef, useEffect } from 'react';

const Matrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Unicode characters for Hindu symbols
    const hinduSymbols = 'ॐ 卐 ☸ 🪔 🪷 🔱 🪬 📿'; // Om, Swastika, Dharma Chakra, Diya, Lotus, Trishul, Hamsa, Prayer Beads
    // Japanese characters (from previous classic Matrix effect)
    const japaneseChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムヨョロヲゴゾドボポヴッン';

    const fontSize = 24; // Larger font size for symbols
    ctx.font = `${fontSize}px Arial`; // Use Arial or a font that supports these symbols
    ctx.textBaseline = 'top';

    const columns = Math.floor(canvas.width / fontSize); // Total number of columns
    const rainDrops: { x: number; y: number; speed: number; color: string; charSet: string }[] = [];

    // Function to get a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Initialize rain drops
    for (let i = 0; i < columns; i++) {
      const charSet = i < columns / 2 ? hinduSymbols : japaneseChars; // Left half: Hindu, Right half: Japanese
      rainDrops.push({
        x: i * fontSize,
        y: Math.random() * canvas.height, // Random starting Y position
        speed: 1 + Math.random() * 2, // Random speed for each drop
        color: getRandomColor(), // Assign a random color
        charSet: charSet, // Assign character set based on column
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Fully opaque black to remove trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.shadowBlur = 0; // No glow
      ctx.shadowColor = 'rgba(0,0,0,0)';

      for (let i = 0; i < rainDrops.length; i++) {
        const drop = rainDrops[i];
        const text = drop.charSet.charAt(Math.floor(Math.random() * drop.charSet.length));
        
        ctx.fillStyle = drop.color; // Set individual drop color
        ctx.fillText(text, drop.x, drop.y);

        drop.y += drop.speed; // Move drop down

        // If drop goes off-screen, reset it to the top with a new random color and speed
        if (drop.y > canvas.height) {
          drop.y = 0; // Reset to top
          drop.speed = 1 + Math.random() * 2; // New random speed
          drop.color = getRandomColor(); // New random color
          // No need to re-assign charSet here as it's determined by column index
        }
      }
    };

    const animationInterval = setInterval(draw, 40); // Adjusted interval for smoother animation

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.font = `${fontSize}px Arial`;
      // Re-initialize rain drops on resize
      rainDrops.length = 0;
      const newColumns = Math.floor(canvas.width / fontSize);
      for (let i = 0; i < newColumns; i++) {
        const charSet = i < newColumns / 2 ? hinduSymbols : japaneseChars;
        rainDrops.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 2,
          color: getRandomColor(),
          charSet: charSet,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(animationInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default Matrix;