import { useEffect, useState } from "react";
import "../styles/GameHistory/GameHistory.scss";

type GameRecord = {
  date: string;
  difficulty: string;
  score: number;
  timer: number;
};

export const GameHistory = () => {
  const [history, setHistory] = useState<GameRecord[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("gameHistory") ?? "[]"
    );
    setHistory(storedHistory);
  }, []);

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {history.length === 0 ? (
        <p>no information about game history</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((game) => (
              <tr key={game.date}>
                <td>{game.date}</td>
                <td>{game.difficulty}</td>
                <td>{game.score}</td>
                <td>{game.timer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
