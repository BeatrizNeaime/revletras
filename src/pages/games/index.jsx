import { useEffect, useState } from "react";
import { videos } from "../../utils/videos";
import Cinema from "../../components/common/Cinema";
import Map from "../../components/common/Map";
import { maps } from "../../utils/maps";
import Asteroids from "./../../games/asteroids/Asteroids";
import Memory from "./../../games/memory/Index";
import Keyboard from "../../games/keyboard";

const mapsNumber = [1, 3, 5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 62];
const videosNumber = [
  0, 2, 4, 6, 7, 12, 13, 18, 19, 24, 25, 30, 31.36, 37, 42, 43, 48, 49, 54, 55,
  60, 61,
];
const asteroidsNumber = [8, 14, 20, 26, 32, 38, 44, 50, 56];
const memoryNumber = [9, 15, 21, 27, 33, 39, 45, 51, 57];
const keyboardNumber = [10, 16, 22, 28, 34, 40, 46, 52, 58];

const GamesPage = () => {
  const [actualPhase, setActualPhase] = useState(0);

  useEffect(() => {
    setActualPhase(parseInt(localStorage.getItem("actualPhase")) || 0);
  }, []);

  const nextPhase = () => {
    setActualPhase((actual) => {
      return actual + 1;
    });
    localStorage.setItem("actualPhase", actualPhase + 1);
  };

  const getVideo = () => {
    if (videosNumber.find((video) => video === actualPhase) == null) {
      return false;
    }
    return true;
  };

  const getMap = () => {
    if (mapsNumber.find((map) => map === actualPhase) == null) {
      return false;
    }
    return true;
  };

  const getAsteroids = () => {
    if (asteroidsNumber.find((asteroid) => asteroid === actualPhase) == null) {
      return false;
    }
    return true;
  };

  const getMemory = () => {
    if (memoryNumber.find((memory) => memory === actualPhase) == null) {
      return false;
    }
    return true;
  };

  const getKeyboard = () => {
    if (keyboardNumber.find((keyboard) => keyboard === actualPhase) == null) {
      return false;
    }
    return true;
  };

  return (
    <>
      {getVideo(actualPhase) && (
        <Cinema
          video={videos[actualPhase]}
          change={nextPhase}
          phase={actualPhase}
        />
      )}
      {getMap(actualPhase) && (
        <Map level={maps[actualPhase]} change={nextPhase} />
      )}
      {getAsteroids(actualPhase) && (
        <Asteroids level={actualPhase} change={nextPhase} />
      )}
      {getMemory(actualPhase) && (
        <Memory level={actualPhase} change={nextPhase} />
      )}
      {getKeyboard(actualPhase) && (
        <Keyboard level={actualPhase} change={nextPhase} />
      )}
    </>
  );
};

export default GamesPage;
