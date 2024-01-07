import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const [text, setText] = useState(''); // Set initial state to an empty string or the desired starting text
  const fullText = 'I heard you say...';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index === fullText.length) {
        clearInterval(intervalId);
      } else {
        setText((prevText) => prevText + fullText[index]);
        index++;
      }
    }, 100); // Change this value to speed up or slow down the effect

    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-2xl">{text}</div>;
};

export default TypingEffect;
