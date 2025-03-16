import React from "react";
import { useGameStore } from "../../store/GameStore";
import "./styles/Card.scss";

type CardProps = {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
};

export const Card: React.FC<CardProps> = ({ id, image, flipped, matched }) => {
  const flipCard = useGameStore((state) => state.flipCard);

  return (
    <button
      className={`card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""}`}
      onClick={() => !flipped && !matched && flipCard(id)}
    >
      {flipped || matched ? (
        <img src={image} alt="memory icon" />
      ) : (
        <div className="back" />
      )}
    </button>
  );
};
