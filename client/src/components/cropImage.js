import React, { useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper(props) {
    const { imageToCrop, onImageCropped } = props;

    const [cropConfig, setCropConfig] = useState(
        {
            unit: '%',
            width: 30,
            aspect: 1,
        }
    );

    const [imageRef, setImageRef] = useState();

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            console.log(imageRef);
            const croppedImage = await getCroppedImage(
                imageRef.target,
                crop,
                'croppedImage.jpeg'
            );
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig) {
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }

                    const file = new File(
                        [blob],
                        'filename.png',
                        {
                            type: blob.type,
                            lastModified: new Date().getTime()
                        }
                    )
                    const croppedImage = file;

                    resolve(croppedImage);
                }, 'image/jpeg'
            );
        });
    }

    return (
        <ReactCrop
            crop={cropConfig}
            ruleOfThirds
            onChange={(cropConfig) => setCropConfig(cropConfig)}
            onComplete={(cropConfig) => cropImage(cropConfig)}
            aspect={1}
        >
            <img
                onLoad={(imageRef) => setImageRef(imageRef)}
                src={imageToCrop} />
        </ReactCrop >
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => { }
}

export default ImageCropper;