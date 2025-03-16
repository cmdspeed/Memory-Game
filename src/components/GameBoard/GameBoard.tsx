import React from "react";
import { useGameStore } from "../../store/GameStore";
import { Card } from "./Card";
import "./styles/GameBoard.scss";

export const GameBoard: React.FC = () => {
  const { cards, resetGame } = useGameStore();

  return (
    <div className="game-board">
      <button onClick={resetGame} className="reset-button">
        Restart Game
      </button>
      <div className="board">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};
