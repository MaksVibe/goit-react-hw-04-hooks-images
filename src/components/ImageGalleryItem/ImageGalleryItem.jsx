import Modal from "../common/Modal/Modal";

const ImageGalleryItem = ({ images, openModal, onModalClose, isModalOpen }) => {
  return images.map(({ webformatURL, id, largeImageURL }) => (
    <li className="ImageGalleryItem" key={id} onClick={openModal}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  ));
};

export default ImageGalleryItem;
