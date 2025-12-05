import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = (
  text: string,
  options: UseTypewriterOptions = {}
) => {
  const { speed = 30, delay = 0, onComplete } = options;
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    setIsTyping(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayText, isComplete, isTyping };
};

export const useTypewriterSequence = (
  texts: string[],
  options: UseTypewriterOptions = {}
) => {
  const { speed = 30, delay = 0 } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayTexts, setDisplayTexts] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= texts.length) {
      setIsComplete(true);
      return;
    }

    const text = texts[currentIndex];
    let charIndex = 0;

    const startTimeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayTexts((prev) => {
            const newTexts = [...prev];
            newTexts[currentIndex] = text.slice(0, charIndex + 1);
            return newTexts;
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setCurrentIndex((prev) => prev + 1);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, currentIndex === 0 ? delay : 100);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, texts, speed, delay]);

  return { displayTexts, isComplete, currentIndex };
};

export default useTypewriter;

