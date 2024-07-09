import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  speed = 50,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const controls = useAnimation();
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let i = 0;

    const animateText = () => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        timerRef.current = window.setTimeout(animateText, speed);
      } else {
        controls.start({ opacity: 1 });
      }
    };

    animateText();

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, speed, controls]);

  return (
    <StyledText
      className={className}
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {displayedText}
      <Cursor
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        |
      </Cursor>
    </StyledText>
  );
};

interface AnimatedTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const StyledText = styled(motion.span)`
  display: inline-block;
  color: #1f2937;
`;

const Cursor = styled(motion.span)`
  display: inline-block;
`;

export default AnimatedText;
