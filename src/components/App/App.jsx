import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getArticles } from '../../api-unsplash';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal'
import Modal from 'react-modal';

import style from './App.module.css';

Modal.setAppElement('#root');

function App() {
  const [isLoading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [query, setQuery] = useState("");
 const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);

  const handleSearch = async (topic) => {
    if (!topic) {
      toast.error("Please enter a search query!");
      setArticles([]);
      setHasLoadMore(false);
      return;
    }
    setQuery(topic);
    setPage(1);
    setHasLoadMore(false);
    try {
      setLoading(true);
      setError(false);
      setArticles([]);
      const fetchedArticles = await getArticles(topic, 1);
      setArticles(fetchedArticles);
      setHasLoadMore(fetchedArticles.length > 0);
      if (fetchedArticles.length === 0) {
        toast.error("No results found for your search query.");
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
    const fetchedArticles = await getArticles(query, nextPage);
    setLoading(false);
    setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
    setHasLoadMore(fetchedArticles.length > page);
  };

  const openModal = (imageData) => {
    setSelectedImageData(imageData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={style.container}>
        <SearchBar onSearch={handleSearch} />
        {isLoading && <Loader />}
        <ErrorMessage showError={error} />
        {articles.length > 0 && <ImageGallery items={articles} onImageClick={openModal} />}
        {hasLoadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      </div>
       <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageData={selectedImageData}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;