import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, openModal }) => {
  const handleClick = (image) => {
    openModal(image);
  };

  return (
    <ul>
      {images.map((image) => (
        <li key={image.id} onClick={() => handleClick(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;