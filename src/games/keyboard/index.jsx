import { GameContainer } from "../../components/common/GameContainer";
import bg from "../../assets/img/common/background.png";
import { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { words } from "./utils/words";
import { Input, Flex } from "antd";
import { HandImage, KeyboardContainer, TargetWord } from "./components/style";
import leftHand from "../../assets/img/maos/e.png";
import rightHand from "../../assets/img/maos/d.png";
import { shuffleWords } from "./scripts/suffleWords";
import { letters } from "./utils/letters";
import { verifyWords } from "./scripts/verifyWords";

const { Text } = Typography;

const Keyboard = ({ level, change }) => {
  const [win, setWin] = useState(false);
  const [rules, setRules] = useState(true);
  const [started, setStarted] = useState(false);
  const [gameWords, setGameWords] = useState(words[level]);
  const [index, setIndex] = useState(0);
  const [fase, setFase] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [spelling, setSpelling] = useState(null);
  const [gameLetters, setGameLetters] = useState(null);
  const [currentFingers, setCurrentFingers] = useState(null);

  const startGame = () => {
    setRules(false);
    setWin(false);
    setStarted(true);
    setIndex(0);
    setFase(0);
    shuffleWords(gameWords, setGameWords);
    setCurrentWord(gameWords[0]);
    console.log(gameWords);
  };

  const handleChange = (value) => {
    value = value.replace(/[^a-zA-Z]/g, "");
    setSpelling(value);
    console.log(value);
    document.getElementById("input").addEventListener("keydown", (e) => {
      if (e.key === "backspace" && spelling.length > 0) {
        setIndex((prev) => (prev - 1 > 0 ? prev - 1 : 0));
        setSpelling(spelling.slice(0, -1));
        alert("backspace");
        return;
      }
    });
    debugger;
    if (index + 1 >= currentWord.length) {
      const check = verifyWords(value, currentWord);
      if (check) {
        setTimeout(() => {
          setFase((prev) => prev + 1);
          setIndex(0);
          setSpelling("");
          document.getElementById("input").focus();
        }, 1000);
        return;
      } else {
        setIndex(0);
        setSpelling("");
        document.getElementById("input").focus();
      }
    }

    setIndex((prev) => prev + 1);
  };

  const findHand = (word) => {
    console.log(word);
    let letras = word.split("");
    const a = letras.map((l) => {
      return letters[l.toUpperCase()];
    });
    console.log(a);
    setCurrentFingers(a);
  };

  useEffect(() => {
    if (fase === gameWords.length) {
      setWin(true);
      setStarted(false);
      return;
    }
    setCurrentWord(gameWords[fase]);
    findHand(gameWords[fase]);
  }, [fase]);

  return (
    <GameContainer bg={bg} cover="true">
      <Modal
        open={rules}
        title="Jogo do Teclado"
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
              startGame();
            }}
          >
            Jogar
          </Button>,
        ]}
      >
        <p>Bem-vindo(a) ao jogo do teclado</p>
        <p>
          Para jogar, insira no teclado as letras necessárias para formar a
          palavra exibida na tela. Boa sorte!
        </p>
      </Modal>
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
              startGame();
            }}
          >
            Jogar Novamente
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setStarted(false);
              setWin(false);
              change();
            }}
          >
            Próxima fase
          </Button>,
        ]}
      >
        <p>Bem-vindo(a) ao jogo do teclado</p>
        <p>
          Para jogar, insira no teclado as letras necessárias para formar a
          palavra exibida na tela. Boa sorte!
        </p>
      </Modal>
      <KeyboardContainer>
        {started && <TargetWord>{currentWord}</TargetWord>}
        <Flex
          justify="space-evenly"
          align="center"
          gap={"small"}
          style={{ width: "100%" }}
        >
          <Input
            id="input"
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              width: "100%",
            }}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
            value={spelling}
          />
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          gap={"large"}
          style={{
            marginTop: "2.5rem",
          }}
        >
          {started ? (
            <>
              {currentFingers[index].side === "left" ? (
                <>
                  <HandImage src={currentFingers[index].hand} />
                  <HandImage src={rightHand} />
                </>
              ) : (
                <>
                  <HandImage src={leftHand} />
                  <HandImage src={currentFingers[index].hand} />
                </>
              )}
            </>
          ) : (
            <>
              <HandImage src={leftHand} />
              <HandImage src={rightHand} />
            </>
          )}
        </Flex>
      </KeyboardContainer>
    </GameContainer>
  );
};

export default Keyboard;
