import React from 'react';
import { Parallax } from 'react-parallax';
import './ParallaxImage.css';

const ParallaxImage = ({ src, children, strength = 500 }) => {
  return (
    <Parallax bgImage={src} strength={strength}>
      <div className="parallax-content">
        {children}
      </div>
    </Parallax>
  );
};

export default ParallaxImage;
