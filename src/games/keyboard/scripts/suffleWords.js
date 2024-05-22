export const shuffleWords = (words, setWords) => {
  const shuffled = words.sort(() => Math.random() - 0.5);
  setWords(shuffled);
  return shuffled;
}