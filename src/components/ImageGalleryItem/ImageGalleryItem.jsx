// import Modal from "../common/Modal/Modal";

const ImageGalleryItem = ({ images, openModal, onModalClose, isModalOpen }) => {
  return images.map(({ webformatURL, id, largeImageURL }) => (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={openModal}
      />
    </li>
  ));
};

export default ImageGalleryItem;
