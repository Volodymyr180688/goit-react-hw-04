import styles from './ImageCard.module.css';

const ImageCard = ({ item, onClick }) => {
    const handleClick = () => {
    onClick(item);
  };
    return (<div className={styles.card}  onClick={handleClick}>
        <img src={item.urls.small} alt={item.alt_description} />
    </div>);
}

export default ImageCard;