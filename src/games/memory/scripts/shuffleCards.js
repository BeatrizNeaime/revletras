import audio from "../../../assets/sounds/memory/effects/shufflecards.mp3";

export function shuffleCards(letras, figuras, setCards, setTurns) {
  setCards([]);
  setTurns(0);
  var sound = new Audio(audio);
  sound.play();
  setTimeout(() => {
    const shuffled = [...letras, ...figuras].sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isFlipped: false, isMatched: false, isDisabled: false, isClickable: true }))
    setCards(shuffled);

  }, 500);
  return
};