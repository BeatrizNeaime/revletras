import { GameContainer } from "../../components/common/GameContainer";
import bg from "../../assets/img/common/background.png";
import { GameWrapper } from "./components/styles";
import { useEffect, useState } from "react";
import { memoryLetters as letters } from "./utils/memoryLetters";
import audio from "../../assets/sounds/common/error.mp3";
import { resetTurns } from "./scripts/resetTurns";
import { shuffleCards } from "./scripts/shuffleCards";
import { cardsMatch } from "./scripts/cardsMatch";
import { Button, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Card from "./components/Card";
import victory from "../../assets/sounds/common/success.mp3";

const Memory = ({ level, change }) => {
  const [cards, setCards] = useState([null]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false);
  const [rules, setRules] = useState(true);
  const [started, setStarted] = useState(false);

  /**
   * Starts the game, shuffles the cards and sets the turns to 0.
   * @returns {void}
   */
  const startGame = () => {
    setWin(false);
    setRules(false);
    setTurns(0);
    setCards([null]);
    shuffleCards(
      letters[level].letters,
      letters[level].images,
      setCards,
      setTurns
    );
    setStarted(true);
  };

  /**
   * Handles the card choice, if the player has already chosen one card, it will set the choice to the second card.
   * @param {object} card
   * @returns {void}
   */
  const handleChoice = (card) => {
    choice1 !== null ? setChoice2({ ...card }) : setChoice1({ ...card });
  };

  /**
   * Checks if the player has won the game, if the player has won, it will set the win state to true.
   */
  useEffect(() => {
    if (started && cards.every((card) => card.isMatched)) {
      var sound = new Audio(victory);
      sound.play();
      setWin(true);
      setStarted(false);
    }

    if (choice1 && choice2) {
      setDisabled(true);
      if (choice1.letter === choice2.letter) {
        setTurns((prevTurns) => prevTurns + 2);
        cardsMatch(setCards, choice1, choice2);
        resetTurns(setChoice1, setChoice2, setTurns);
        return;
      }
      var sound = new Audio(audio);
      sound.play();
      resetTurns(setChoice1, setChoice2, setTurns);
    }

    console.log(win);
    setDisabled(false);
  }, [choice1, choice2]);

  return (
    <GameContainer bg={bg} cover="true">
      <Modal
        open={rules}
        title="Jogo da Memória"
        onOk={startGame}
        onCancel={() => {
          setRules(false);
          window.location.href = "/";
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setRules(false);
              window.location.href = "/";
            }}
          >
            <HomeOutlined />
          </Button>,
          <Button key="submit" type="primary" onClick={startGame}>
            Jogar
          </Button>,
        ]}
      >
        <p>Para jogar, combine a letra e o desenho! Boa sorte!</p>
      </Modal>
      {/* win modal */}
      <Modal
        open={win}
        title="Parabéns! Você venceu!"
        onCancel={() => {
          setRules(false);
          window.location.href = "/";
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setRules(false);
              window.location.href = "/";
            }}
          >
            <HomeOutlined />
          </Button>,
          <Button
            key="retry"
            type="primary"
            onClick={() => {
              setWin(false);
              startGame();
            }}
          >
            Jogar Novamente
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setWin(false);
              change();
            }}
          >
            Próxima Fase
          </Button>,
        ]}
      >
        <p>Você venceu com {turns} jogadas!</p>
        <p>
          Caso queira jogar novamente, clique em "Jogar"!. Caso deseje avançar
          para a próxima fase, clique em "Próxima Fase"!.
        </p>
      </Modal>
      <GameWrapper>
        {started &&
          cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={
                card.id === choice1?.id ||
                card.id === choice2?.id ||
                card.isMatched
                  ? true
                  : false
              }
              disabled={disabled}
            />
          ))}
      </GameWrapper>
    </GameContainer>
  );
};

export default Memory;
