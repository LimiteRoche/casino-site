import React from "react";

const GameSlider = ({ games }: { games: string[] }) => {
  return (
    <div className="overflow-hidden relative">
      <div className="slider flex space-x-4">
        {games.map((game, index) => (
          <div key={index} className="game-item w-32 h-32 bg-gray-300 flex items-center justify-center rounded-lg">
            {game}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSlider;
