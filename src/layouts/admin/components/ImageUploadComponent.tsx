import React, { useState } from 'react';
import { Form, Button, Carousel } from 'react-bootstrap';
interface Props {
  onImageUpload: (images: File[]) => void; // Define prop for passing uploaded images
  Chapter: (chapter: string) => void;
}
const ImageUploadComponent: React.FC<Props> = ({ onImageUpload, Chapter }) => {
  const [images, setImages] = useState<File[]>([]);
  const [material, setMaterial] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
      // Call the onImageUpload prop with selected images
      onImageUpload(selectedImages);
    }
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial(e.target.value);
    //set material to Chapter
    Chapter(e.target.value);
  };

  return (
    <div>
      <Form.Group controlId="image">
        <Form.Control type="file" 
        multiple onChange={handleImageChange}
        accept='images/*'
        className='mt-3'/>
      </Form.Group>
      {images.length > 0 && (
        <Carousel className="my-4">
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={URL.createObjectURL(image)}
                alt={`Uploaded Course Image ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {images.length > 0 && (
        <Button variant="primary" onClick={() => setImages([])}>
          Remove Images
        </Button>
      )}
      {/* Form text-area */}
      <Form.Group controlId="material">
        <Form.Label>Nội dung</Form.Label>
        <Form.Control type="text" name="material" value={material} onChange={handleMaterialChange} />
      </Form.Group>
    </div>
  );
};

export default ImageUploadComponent;
