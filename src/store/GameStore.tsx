// Zustand store
import { create } from "zustand";
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import icon5 from "../images/icon5.png";
import icon6 from "../images/icon6.png";

const images = [icon1, icon2, icon3, icon4, icon5, icon6];

type CardType = {
  id: number;
  image: string;
  matched: boolean;
  flipped: boolean;
};

type GameState = {
  cards: CardType[];
  flipCard: (id: number) => void;
  resetGame: () => void;
};

const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const useGameStore = create<GameState>((set) => ({
  cards: shuffleArray([...images, ...images]).map((image, index) => ({
    id: index,
    image,
    matched: false,
    flipped: false,
  })),

  flipCard: (id) =>
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      );

      const flippedCards = newCards.filter(
        (card) => card.flipped && !card.matched
      );

      if (flippedCards.length === 2) {
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

      return { cards: newCards };
    }),

  resetGame: () =>
    set(() => ({
      cards: shuffleArray([...images, ...images]).map((image, index) => ({
        id: index,
        image,
        matched: false,
        flipped: false,
      })),
    })),
}));
