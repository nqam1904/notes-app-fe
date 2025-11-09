import Image from "next/image";
import styles from "./styles.module.scss";

type RatingProps = {
  rating: number;
};

const Rating: React.FC<RatingProps> = ({ rating = 0 }) => {
  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          src={
            index < rating
              ? "/images/icons/ic_start.png"
              : "/images/icons/ic_none_start.png"
          }
          alt="star"
          width={24}
          height={24}
        />
      ))}
    </div>
  );
};

export default Rating;
