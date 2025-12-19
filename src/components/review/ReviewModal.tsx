import Modal from "../UI/Modal/Modal";
import Review from "./Review";
import styles from "./ReviewModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  movieId: number;
}

export default function ReviewModal({
  isOpen,
  onClose,
  movieTitle,
  movieId
}: Props) {
  return (
    <Modal open={isOpen} onClose={onClose} className={styles.reviewModal}>
      <Review movieTitle={movieTitle} movieId={movieId} onClose={onClose} />
    </Modal>
  );
}
