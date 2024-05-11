 import { useState } from 'react';
import fetchData from '../api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';



const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (image) => {
  if (!modalIsOpen) {
    setSelectedImage(image);
    setModalIsOpen(true);
  }
};

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const fetchedImages = await fetchData(query, 1);
      setImages(fetchedImages);
      setQuery(query);
      setPage(1);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const fetchedImages = await fetchData(query, nextPage);
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setPage(nextPage);
      setError(null);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      <ErrorMessage message={error} />
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <ImageGallery images={images} openModal={openModal} closeModal={closeModal} />
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={modalIsOpen} image={selectedImage} onRequestClose={closeModal} />
    </div>
  );
};

export default App;