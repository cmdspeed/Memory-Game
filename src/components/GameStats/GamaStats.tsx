import { useGameStore } from "../../store/GameStore";

export const GameStats = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div className="game-stats">
      <p>Liczba prób: {score}</p>
    </div>
  );
};
