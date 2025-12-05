import { useEffect, useRef } from "react";

const MatrixRain = () => {
      const canvasRef = useRef<HTMLCanvasElement>(null);

      useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const resizeCanvas = () => {
                  canvas.width = window.innerWidth;
                  canvas.height = window.innerHeight;
            };

            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);

            const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const charArray = chars.split("");

            const fontSize = 14;
            const columns = Math.floor(canvas.width / fontSize);

            const drops: number[] = [];
            for (let i = 0; i < columns; i++) {
                  drops[i] = Math.random() * -100;
            }

            const draw = () => {
                  ctx.fillStyle = "rgba(10, 15, 20, 0.05)";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  ctx.fillStyle = "#4ade80";
                  ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

                  for (let i = 0; i < drops.length; i++) {
                        const char = charArray[Math.floor(Math.random() * charArray.length)];
                        const x = i * fontSize;
                        const y = drops[i] * fontSize;

                        // Varying opacity for depth effect
                        const opacity = Math.random() * 0.5 + 0.5;
                        ctx.fillStyle = `rgba(74, 222, 128, ${opacity})`;

                        ctx.fillText(char, x, y);

                        if (y > canvas.height && Math.random() > 0.975) {
                              drops[i] = 0;
                        }
                        drops[i]++;
                  }
            };

            const interval = setInterval(draw, 50);

            return () => {
                  clearInterval(interval);
                  window.removeEventListener("resize", resizeCanvas);
            };
      }, []);

      return (
            <canvas
                  ref={canvasRef}
                  className="matrix-rain"
                  aria-hidden="true"
            />
      );
};

export default MatrixRain;

