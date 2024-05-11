import Modal from 'react-modal';

const ImageModal = ({ isOpen, image, onRequestClose }) => {
  if (!isOpen || !image) {
    return null;
  } 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
    >
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        {/* Додати іншу інформацію про зображення, якщо потрібно */}
      </div>
    </Modal>
  );
};
export default ImageModal;