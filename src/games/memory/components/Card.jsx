import flip from "../../../assets/sounds/memory/effects/flipcard.mp3";
import cover from "../../../assets/img/common/cover.png";
import { CardComponent } from "./styles";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    var audio = new Audio(flip);
    var letter = new Audio(card.sound);
    if (!disabled) {
      audio.play();
      setTimeout(() => {
        letter.play();
      }, 500);
      handleChoice(card);
    }
  };

  return (
    <CardComponent>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.img} alt="" className="card-img" />
        <img src={cover} alt="" className="card-cover" onClick={handleClick} />
      </div>
    </CardComponent>
  );
};

export default Card;
