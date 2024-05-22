import { useEffect, useRef, useState } from "react";
import space from "../../assets/img/asteroids/space1.png";
import destroy from "../../assets/sounds/asteroids/destroy_asteroid.mp3";
import shootSound from "../../assets/sounds/asteroids/shoot.mp3";
import correct from "../../assets/sounds/common/correct.mp3";
import dead from "../../assets/sounds/common/error.mp3";
import loose from "../../assets/sounds/asteroids/loose.mp3";
import { asteroidsLetters as letters } from "./utils/letters";
import { GameContainer } from "./../../components/common/GameContainer";
import { createLettersArray } from "./scripts/createLettersArray";
import { Button, FloatButton, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { StyledScore } from "./components/style";
import bg from "../../assets/img/asteroids/space1.png";
import { HeartFilled } from "@ant-design/icons";

const Asteroids = ({ level, change }) => {
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [modalInfo, setModalInfo] = useState(true);
  const [modalWin, setModalWin] = useState(false);
  const [modalLoose, setModalLoose] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameLetters, setGameLetters] = useState([null]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    document.querySelector("video").pause();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setOpen(false);
    localStorage.setItem("actualPhase", level);
    window.location.href = "/";
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    localStorage.setItem("name", values.name);
    setIsModalOpen(false);
    change();
  };

  const handleSkip = () => {
    if (level + 1 === 5) {
      showModal();
    } else {
      change();
    }
  };

  const initializeCanvas = () => {
    if (started) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      const player = new Player({
        position: { x: canvas.width / 2, y: canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        ctx: ctx,
        canas: canvas,
      });
      player.draw();

      player.listenKeys();
      player.generateAsteroids();
      player.generateLetters();
    }
  };

  const handleHome = () => {
    setModalInfo(false);
    window.location.href = "/";
  };

  const handleStart = () => {
    setModalInfo(false);
    setModalLoose(false);
    setStarted(true);
  };

  useEffect(() => {
    if (!started) {
      createLettersArray(letters[level], setGameLetters);
      setLives(3);
      setLetterIndex(0);
    }
    if (started && lives === 3) {
      initializeCanvas();
    }

    if (lives === 0) {
      setStarted(false);
      setModalLoose(true);
      document.getElementsByTagName("canvas")[0].style.display = "none";
    }
  }, [started, lives]);

  /* PLAYER */
  class Player {
    constructor({ position, velocity, ctx, canvas }) {
      this.position = position;
      this.velocity = velocity;
      this.rotation = 0;
      this.ctx = ctx;
      this.canvas = canvas;
      this.lastShoot = 0;
      this.keys = {
        arrowUp: {
          pressed: false,
        },
        arrowDown: {
          pressed: false,
        },
        arrowLeft: {
          pressed: false,
        },
        arrowRight: {
          pressed: false,
        },
        space: {
          pressed: false,
        },
      };
      this.shoots = [];
      this.asteroids = [];
      this.letters = [];
      this.destroy = new Audio(destroy);
      this.dead = new Audio(loose);
      this.right = new Audio(correct);
      this.loose = new Audio(dead);
    }

    animate() {
      const animationId = window.requestAnimationFrame(this.animate.bind(this));
      this.update();
      window.localStorage.setItem("lives", parseInt(this.lives));

      for (let i = this.shoots.length - 1; i >= 0; i--) {
        const bullet = this.shoots[i];
        if (
          bullet.position.x > window.innerWidth ||
          bullet.position.x < 0 ||
          bullet.position.y > window.innerHeight ||
          bullet.position.y < 0
        ) {
          this.shoots.splice(i, 1);
        }
        bullet.update();
      }

      for (let i = this.asteroids.length - 1; i >= 0; i--) {
        const asteroid = this.asteroids[i];

        if (this.playerCollision(asteroid, this.getVertices())) {
          this.loose.play();
          this.asteroids.splice(i, 1);
          setLives((prev) => prev - 1);
          if (lives - 1 === 0) {
            setStarted(false);
            setModalLoose(true);
            window.cancelAnimationFrame(animationId);
          }
        }

        if (asteroid.position.x < 0) {
          this.asteroids.splice(i, 1);
        }

        for (let j = this.shoots.length - 1; j >= 0; j--) {
          const bullet = this.shoots[j];

          if (this.shootCollision(asteroid, bullet)) {
            this.destroy.play();
            this.asteroids.splice(i, 1);
            this.shoots.splice(j, 1);
          }
        }
        asteroid.update();
      }

      for (let i = this.letters.length - 1; i >= 0; i--) {
        const letter = this.letters[i];
        if (letter.position.x < 0) {
          this.letters.splice(i, 1);
        }

        if (this.playerGetLetter(letter, this.getVertices())) {
          let aux = gameLetters.findIndex((l) => l.letter === letter.letter);
          console.log(aux, letterIndex);
          if (aux === letterIndex) {
            this.right.play();
            setLetterIndex((prev) => prev + 1);
            gameLetters.splice(aux, 1);
            if (gameLetters.length === 0) {
              setStarted(false);
              setModalWin(true);
              window.cancelAnimationFrame(animationId);
            }
          } else {
            this.dead.play();
            setLives((prev) => prev - 1);
            if (lives === 0) {
              setStarted(false);
              setModalLoose(true);
              window.cancelAnimationFrame(animationId);
            }
          }
          this.letters.splice(i, 1);
        }

        letter.update();
      }

      this.velocity.x = 0;
      this.velocity.y = 0;

      if (this.keys.arrowUp.pressed) {
        this.velocity.y = -5;
      }

      if (this.keys.arrowDown.pressed) {
        this.velocity.y = 5;
      }

      if (this.keys.arrowRight.pressed) {
        this.velocity.x = 5;
      }

      if (this.keys.arrowLeft.pressed) {
        this.velocity.x = -5;
      }
    }

    getVertices() {
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);

      return [
        {
          x: this.position.x + cos * 30 - sin * 0,
          y: this.position.y + sin * 30 + cos * 0,
        },
        {
          x: this.position.x + cos * -10 - sin * 10,
          y: this.position.y + sin * -10 + cos * 10,
        },
        {
          x: this.position.x + cos * -10 - sin * -10,
          y: this.position.y + sin * -10 + cos * -10,
        },
      ];
    }

    shootCollision(c1, c2) {
      const xDiff = c2.position.x - c1.position.x;
      const yDiff = c2.position.y - c1.position.y;
      const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      if (distance <= c1.radius + c2.radius) {
        return true;
      }
      return false;
    }

    isPointOnLineSegment(x, y, start, end) {
      return (
        x >= Math.min(start.x, end.x) &&
        x <= Math.max(start.x, end.x) &&
        y >= Math.min(start.y, end.y) &&
        y <= Math.max(start.y, end.y)
      );
    }

    playerCollision(circle, triangle) {
      // Check if the circle is colliding with any of the triangle's edges
      for (let i = 0; i < 3; i++) {
        let start = triangle[i];
        let end = triangle[(i + 1) % 3];

        let dx = end.x - start.x;
        let dy = end.y - start.y;
        let length = Math.sqrt(dx * dx + dy * dy);

        let dot =
          ((circle.position.x - start.x) * dx +
            (circle.position.y - start.y) * dy) /
          Math.pow(length, 2);

        let closestX = start.x + dot * dx;
        let closestY = start.y + dot * dy;

        if (!this.isPointOnLineSegment(closestX, closestY, start, end)) {
          closestX = closestX < start.x ? start.x : end.x;
          closestY = closestY < start.y ? start.y : end.y;
        }

        dx = closestX - circle.position.x;
        dy = closestY - circle.position.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= circle.radius) {
          return true;
        }
        return false;
      }

      // No collision
      return false;
    }

    playerGetLetter(letter, triangle) {
      for (let i = 0; i < 3; i++) {
        let start = triangle[i];
        let end = triangle[(i + 1) % 3];

        let dx = end.x - start.x;
        let dy = end.y - start.y;
        let length = Math.sqrt(dx * dx + dy * dy);

        let dot =
          ((letter.position.x - start.x) * dx +
            (letter.position.y - start.y) * dy) /
          Math.pow(length, 2);

        let closestX = start.x + dot * dx;
        let closestY = start.y + dot * dy;

        if (!this.isPointOnLineSegment(closestX, closestY, start, end)) {
          closestX = closestX < start.x ? start.x : end.x;
          closestY = closestY < start.y ? start.y : end.y;
        }

        dx = closestX - letter.position.x;
        dy = closestY - letter.position.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= 20) {
          return true;
        }
        return false;
      }
    }

    draw() {
      const bg = new Image();
      bg.src = space;
      bg.onload = () => {
        this.ctx.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);
      };

      this.ctx.save();

      this.ctx.translate(this.position.x, this.position.y);
      this.ctx.rotate(this.rotation);
      this.ctx.translate(-this.position.x, -this.position.y);

      this.ctx.beginPath();
      this.ctx.moveTo(this.position.x + 30, this.position.y);
      this.ctx.lineTo(this.position.x - 10, this.position.y - 10);
      this.ctx.lineTo(this.position.x - 10, this.position.y + 10);
      this.ctx.closePath();

      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
      this.ctx.restore();
    }

    generateAsteroids() {
      setInterval(() => {
        this.asteroids.push(
          new Asteroid({
            position: {
              x: window.innerWidth,
              y: Math.random() * window.innerHeight + 10,
            },
            velocity: { x: -parseInt(Math.random() * 5 + 1), y: 0 },
            ctx: this.ctx,
            canvas: this.canvas,
          })
        );
      }, parseInt(Math.random() * 5000 + 1000));
    }

    generateLetters() {
      setInterval(() => {
        this.letters.push(
          new Letter({
            position: {
              x: window.innerWidth,
              y: Math.random() * window.innerHeight + 10,
            },
            velocity: { x: -1, y: 0 },
            ctx: this.ctx,
            canvas: this.canvas,
            letter: letters[level][Math.floor(Math.random() * 7)].letter,
          })
        );
      }, parseInt(Math.random() * 5000 + 1000));
      console.log(this.letters);
    }

    listenKeys() {
      window.addEventListener("keydown", (k) => {
        switch (k.code) {
          case "ArrowUp":
            this.keys.arrowUp.pressed = true;
            break;
          case "ArrowDown":
            this.keys.arrowDown.pressed = true;
            break;
          case "ArrowLeft":
            this.keys.arrowLeft.pressed = true;
            break;
          case "ArrowRight":
            this.keys.arrowRight.pressed = true;
            break;

          case "Space":
            this.shoot();
            break;

          default:
            break;
        }
      });
      window.addEventListener("keyup", (k) => {
        switch (k.code) {
          case "ArrowUp":
            this.keys.arrowUp.pressed = false;
            break;
          case "ArrowDown":
            this.keys.arrowDown.pressed = false;
            break;
          case "ArrowLeft":
            this.keys.arrowLeft.pressed = false;
            break;
          case "ArrowRight":
            this.keys.arrowRight.pressed = false;
            break;
          default:
            break;
        }
      });
      this.animate();
    }

    shoot() {
      const now = Date.now();
      if (now - this.lastShoot > 500) {
        const audio = new Audio(shootSound);
        audio.play();
        this.lastShoot = now;
        this.shoots.push(
          new Bullet({
            position: { x: this.position.x + 30, y: this.position.y },
            velocity: { x: 8, y: 0 },
            ctx: this.ctx,
            canvas: this.canvas,
          })
        );
      }
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.x < 0) {
        this.position.x = 0;
      }
      if (this.position.x > window.innerWidth - 10) {
        this.position.x = window.innerWidth - 10;
      }

      if (this.position.y < 0) {
        this.position.y = 0;
      }
      if (this.position.y > window.innerHeight - 10) {
        this.position.y = window.innerHeight - 10;
      }
    }
  }

  /* ASTEROID */
  class Asteroid {
    constructor({ position, velocity, ctx, canvas }) {
      this.position = position;
      this.velocity = velocity;
      this.ctx = ctx;
      this.canvas = canvas;
      this.radius = Math.random() * 40 + 10;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.closePath();
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  /* LETTER */
  class Letter {
    constructor({ position, velocity, ctx, canvas, letter }) {
      this.position = position;
      this.velocity = velocity;
      this.ctx = ctx;
      this.canvas = canvas;
      this.letter = letter;
    }

    draw() {
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(this.letter, this.position.x, this.position.y);
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  /* BULLET */
  class Bullet {
    constructor({ position, velocity, ctx, canvas }) {
      this.position = position;
      this.velocity = velocity;
      this.ctx = ctx;
      this.canvas = canvas;
      this.radius = 2;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.closePath();
      this.ctx.fillStyle = "white";
      this.ctx.fill();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  return (
    <GameContainer bg={bg}>
      <Modal
        open={modalInfo}
        title="Jogo Asteroides"
        onCancel={handleHome}
        footer={[
          <Button key="back" onClick={handleHome}>
            <HomeOutlined />
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setModalInfo(false);
              setStarted(true);
            }}
          >
            Jogar
          </Button>,
        ]}
      >
        <p>Bem-vindo(a) ao jogo asteroides!.</p>
        <p>
          Para jogar, você deve capturar as letras na ordem indicada. Utilize as
          setas do teclado para se mover e a barra de espaço para atirar.
        </p>
        <p>Boa sorte!.</p>
      </Modal>
      {/* modal loose */}
      <Modal
        open={modalLoose}
        title="Que pena!"
        onCancel={handleHome}
        footer={[
          <Button key="back" onClick={handleHome}>
            <HomeOutlined />
          </Button>,
          <Button key="submit" type="primary" onClick={handleStart}>
            Jogar Novamente
          </Button>,
        ]}
      >
        <p>Que pena!.</p>
        <p>
          Não se esqueça de que você pode tentar novamente. Basta clicar no
          botão abaixo.
        </p>
        <p>
          Caso prefira, você pode voltar para a página inicial clicando no ícone
          de casa.
        </p>
      </Modal>
      {/* modal win */}
      <Modal
        open={modalWin}
        title="Que pena!"
        footer={[
          <Button key="back" onClick={handleHome}>
            <HomeOutlined />
          </Button>,
          <Button key="submit" type="primary" onClick={handleSkip}>
            Próxima Fase
          </Button>,
        ]}
      >
        <p>Parabéns!.</p>
        <p>
          Você resgatou todas as letras. Clique no botão abaixo para avançar
          para a próxima fase.
        </p>
        <p>
          Caso prefira, você pode voltar para a página inicial clicando no ícone
          de casa.
        </p>
      </Modal>
      {started && (
        <StyledScore>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            Letras: {gameLetters.map((l) => l?.letter).join(" ")}
          </span>
          <span
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            Vidas:{" "}
            {Array.from({ length: lives }, (_, i) => (
              <HeartFilled key={i} style={{ color: "red" }} />
            ))}
          </span>
        </StyledScore>
      )}
      <FloatButton
        trigger="click"
        style={{
          left: "2rem",
          bottom: "10%",
        }}
        icon={<HomeOutlined />}
        onClick={() => {
          Modal.confirm({
            title: "Tem certeza?",
            content: "Você está prestes a sair do jogo. Deseja continuar?",
            onCancel: handleCancel,
            onOk: handleOk,
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
          });
        }}
      />
      <canvas ref={canvasRef}></canvas>;
    </GameContainer>
  );
};

export default Asteroids;
