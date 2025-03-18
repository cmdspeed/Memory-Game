// Zustand store
import { create } from "zustand";
import { generateCards } from "./generateCards/generateCards";

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
  isFlipping: boolean;
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  flipCard: (id: number) => void;
  resetGame: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  saveGameHistory: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  cards: generateCards("easy"),
  difficulty: "easy",
  score: 0,
  timer: 0,
  intervalId: 0,
  isFlipping: false,

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
    }
  },

  flipCard: (id) =>
    set((state) => {
      if (state.isFlipping) {
        return { cards: state.cards };
      }

      const newCards = state.cards.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      );

      const flippedCards = newCards.filter(
        (card) => card.flipped && !card.matched
      );

      // start timer================================================================
      if (state.intervalId === 0 && flippedCards.length > 0) {
        get().startTimer();
      }
      // ===========================================================================

      if (flippedCards.length === 2) {
        set({ isFlipping: true });

        set((state) => ({ score: state.score + 1 }));
        setTimeout(() => {
          set({ isFlipping: false });
        }, 1000);
        if (flippedCards[0].image === flippedCards[1].image) {
          newCards.forEach((card) => {
            if (card.image === flippedCards[0].image) {
              card.matched = true;
              set({ isFlipping: false });
            }
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
    set(() => {
      const { intervalId } = get();

      if (intervalId) {
        clearInterval(intervalId);
      }
      return {
        difficulty,
        cards: generateCards(difficulty),
        score: 0,
        timer: 0,
        intervalId: 0,
      };
    }),
}));
