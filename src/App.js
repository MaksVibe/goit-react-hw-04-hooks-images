import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem.jsx";
import Modal from "./components/common/Modal/Modal.jsx";
import Loader from "react-loader-spinner";

import { Component } from "react";
import Button from "./components/common/Button/Button.jsx";

class App extends Component {
  state = {
    q: "",
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    largeImage: "",
    isModalOpen: false,
  };

  fetchImages = async (q, page = 1) => {
    const BASE_URL = `https://pixabay.com/api/?key=24483741-f975205992ca850031cfb75db&q=${q}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
    const res = await fetch(BASE_URL);
    return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q || prevState.page !== this.state.page) {
      this.getImages(this.state.q, this.state.page);
    }
  }

  hendleSubmit = (input) => {
    if (!input) return false;
    this.setState({ q: input, images: [] });
  };

  handleLoadMore = async () => {
    this.setState({ isLoading: true });
    try {
      this.setState((prev) => ({ page: prev.page + 1 }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getImages = async (q, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits } = await this.fetchImages(q, page);
      this.setState((prev) => ({ images: [...prev.images, ...hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onModalOpen = (e) => {
    const largeURL = e.target.getAttribute("src");
    return this.setState({ isModalOpen: true, largeImage: largeURL });
  };

  onModalClose = () => {
    return this.setState({ isModalOpen: false });
  };

  render() {
    const { images, largeImage, isLoading, isModalOpen } = this.state;
    return (
      <div className="App">
        <Searchbar hendleSubmit={this.hendleSubmit} />

        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              images={images}
              openModal={this.onModalOpen}
              isLoading={isLoading}
            />
          </ImageGallery>
        )}
        {images.length > 11 && <Button handleLoadMore={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal largeImage={largeImage} onModalClose={this.onModalClose} />
        )}
      </div>
    );
  }
}
export default App;
