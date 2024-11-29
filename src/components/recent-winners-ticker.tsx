// File: src/components/RecentWinnersTicker.tsx
import React, { useEffect, useState } from 'react';

const RecentWinnersTicker: React.FC = () => {
  const [winners, setWinners] = useState([
    { name: 'John D.', game: 'Mega Moolah', amount: '$1,234,567' },
    { name: 'Sarah L.', game: 'Starburst', amount: '$98,765' },
    { name: 'Mike R.', game: 'Gonzo\'s Quest', amount: '$54,321' },
    { name: 'John D.', game: 'Mega Moolah', amount: '$1,234,567' },
    { name: 'Sarah L.', game: 'Starburst', amount: '$98,765' },
    { name: 'Mike R.', game: 'Gonzo\'s Quest', amount: '$54,321' }, 
    // Add more dummy data as needed
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners(prevWinners => {
        const newWinners = [...prevWinners];
        newWinners.push(newWinners.shift());
        return newWinners;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="flex animate-scroll">
        {winners.map((winner, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            <span className="font-bold">{winner.name}</span> won {winner.amount} on {winner.game}!
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWinnersTicker;