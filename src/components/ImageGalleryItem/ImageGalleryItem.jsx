const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(({ webformatURL, id }) => (
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
