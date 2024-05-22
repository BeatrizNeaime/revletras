export const createLettersArray = (value, setLetters) => {
  const shuffled = [...value].sort(() => Math.random() - 0.5).map((letter) => ({
    ...letter,
    id: Math.random(),
    isMatched: false
  }))
  return setLetters(shuffled);
}