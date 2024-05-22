import correct from '../../../assets/sounds/common/correct.mp3'
import wrong from '../../../assets/sounds/common/error.mp3'

export const verifyWords = (word, target) => {
  if (word === target) {
    const audio = new Audio(correct);
    audio.play();
    return true;
  } else {
    const audio = new Audio(wrong);
    audio.play();
    return false;
  }
}