// Zustand store
import { create } from "zustand";

import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import icon5 from "../images/icon5.png";
import icon6 from "../images/icon6.png";
import icon7 from "../images/icon7.png";
import icon8 from "../images/icon8.png";
import icon9 from "../images/icon9.png";
import icon10 from "../images/icon10.png";
import icon11 from "../images/icon11.png";
import icon12 from "../images/icon12.png";
import icon13 from "../images/icon13.png";
import icon14 from "../images/icon14.png";
import icon15 from "../images/icon15.png";
import icon16 from "../images/icon16.png";

const images = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
];

type CardType = {
  id: number;
  image: string;
  matched: boolean;
  flipped: boolean;
};

type GameState = {
  cards: CardType[];
  difficulty: "easy" | "medium" | "hard";
  score: number;
  timer: number;
  intervalId: number;
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  flipCard: (id: number) => void;
  resetGame: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  saveGameHistory: () => void;
};

const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

const generateCards = (difficulty: "easy" | "medium" | "hard") => {
  let pairs: number;
  switch (difficulty) {
    case "easy":
      pairs = 6;
      break;
    case "medium":
      pairs = 12;
      break;
    case "hard":
      pairs = 18;
      break;
    default:
      pairs = 6;
  }
  const selectedImages = shuffleArray(images).slice(0, pairs);

  const cards = [...selectedImages, ...selectedImages];
  return shuffleArray(cards).map((image, index) => ({
    id: index,
    image,
    matched: false,
    flipped: false,
  }));
};

export const useGameStore = create<GameState>((set, get) => ({
  cards: generateCards("easy"),
  difficulty: "easy",
  score: 0,
  timer: 0,
  intervalId: 0,

  startTimer: () => {
    set((state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }

      const interval = setInterval(() => {
        set((s) => ({ timer: s.timer + 1 }));
      }, 1000);

      return { intervalId: interval };
    });
  },
  saveGameHistory() {
    const { score, timer, difficulty } = get();
    const historyItem = {
      score,
      timer,
      difficulty,
      date: new Date().toLocaleString(),
    };

    const history = JSON.parse(localStorage.getItem("gameHistory") ?? "[]");
    history.push(historyItem);
    localStorage.setItem("gameHistory", JSON.stringify(history));
  },

  stopTimer: () => {
    const { intervalId, timer, score, saveGameHistory } = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: 0 });
      alert(
        `Well done! It took you ${timer} seconds. number of attempts: ${score}`
      );
      saveGameHistory();
      get().resetGame();
      get().startTimer();
    }
  },

  flipCard: (id) =>
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      );

      const flippedCards = newCards.filter(
        (card) => card.flipped && !card.matched
      );

      if (flippedCards.length === 2) {
        set((state) => ({ score: state.score + 1 }));

        if (flippedCards[0].image === flippedCards[1].image) {
          newCards.forEach((card) => {
            if (card.image === flippedCards[0].image) card.matched = true;
          });
        } else {
          setTimeout(() => {
            set((s) => ({
              // s = current state | c = single card in the array
              cards: s.cards.map((c) =>
                c.flipped && !c.matched ? { ...c, flipped: false } : c
              ),
            }));
          }, 1000);
        }
      }

      if (newCards.every((card) => card.matched)) {
        setTimeout(() => {
          get().stopTimer();
        }, 500);
      }

      return { cards: newCards };
    }),

  resetGame: () =>
    set((state) => ({
      cards: generateCards(state.difficulty),
      score: 0,
      timer: 0,
    })),

  setDifficulty: (difficulty) =>
    set(() => ({
      difficulty,
      cards: generateCards(difficulty),
      score: 0,
      timer: 0,
      intervalId: 0,
    })),
}));
