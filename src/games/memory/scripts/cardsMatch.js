import audio from "../../../assets/sounds/common/correct.mp3";

export function cardsMatch(setCards, choice1, choice2) {
  var sound = new Audio(audio);
  setTimeout(() => {
    sound.play()
  }, 500);
  setCards(prevCard => {
    return prevCard.map(card => {
      if (card.id === choice1.id || card.id === choice2.id) {
        return { ...card, isMatched: true, isFlipped: true, isClickable: false }
      }
      return card;
    })
  })
  return
}