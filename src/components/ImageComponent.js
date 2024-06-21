// src/components/ImageComponent.js
import React from 'react';

const ImageComponent = ({ altText, ...props }) => {
    return (
        <img src={`${process.env.PUBLIC_URL}/assets/infra.png`} alt={altText} {...props} />
    );
};
export default ImageComponent;