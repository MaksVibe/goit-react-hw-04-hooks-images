import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem.jsx";
import Modal from "./components/common/Modal/Modal.jsx";
import Loader from "react-loader-spinner";

import { useState, useEffect } from "react";
import Button from "./components/common/Button/Button.jsx";

const App = () => {
  const [q, setQ] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState("");
  const [isModalOpen, setIsModalOpeng] = useState(false);

  useEffect(() => {
    if (!q) return false;
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits } = await fetchImages(q, page);
        setImages((prevImages) => [...prevImages, ...hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, q]);

  const fetchImages = async (q, page = 1) => {
    const BASE_URL = `https://pixabay.com/api/?key=24483741-f975205992ca850031cfb75db&q=${q}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
    const res = await fetch(BASE_URL);
    return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
  };

  const hendleSubmit = (input) => {
    if (!input || q === input || input.length < 1) return false;
    setQ(input);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      setPage(page + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onModalOpen = (e) => {
    const largeURL = e.target.getAttribute("src");
    setIsModalOpeng(true);
    setLargeImage(largeURL);
    return;
  };

  const onModalClose = () => {
    return setIsModalOpeng(false);
  };

  return (
    <div className="App">
      <Searchbar hendleSubmit={hendleSubmit} />
      <ImageGallery isLoading={isLoading}>
        {images.length > 0 && (
          <ImageGalleryItem images={images} openModal={onModalOpen} />
        )}

        {isLoading && (
          <Loader type="Grid" color="#00BFFF" height={80} width={80} />
        )}
      </ImageGallery>
      {images.length > 11 && <Button handleLoadMore={handleLoadMore} />}
      {isModalOpen && (
        <Modal largeImage={largeImage} onModalClose={onModalClose} />
      )}
    </div>
  );
};

export default App;
