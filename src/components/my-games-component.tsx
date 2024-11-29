// src/components/MyGamesComponent.tsx
import React from 'react';
import { useStore } from '@nanostores/react';

import { useTranslations } from '../i18n/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { languageStore } from '@/stores/language-store';

interface Game {
  id: string;
  name: string;
  image: string;
  timesPlayed?: number;
  wins?: number;
}

interface Bonus {
  id: string;
  name: string;
  description: string;
  expiryDate: string;
}

interface UserData {
  mostPlayed: Game[];
  mostWins: Game[];
  favorites: Game[];
  availableBonuses: Bonus[];
  statistics: {
    totalGamesPlayed: number;
    totalWins: number;
    biggestWin: number;
    favoriteCategory: string;
  };
}

interface MyGamesComponentProps {
  userData: UserData;
}

export default function MyGamesComponent({ userData }: MyGamesComponentProps) {
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  const GameList = ({ games, type }: { games: Game[], type: 'played' | 'wins' | 'favorites' }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {games.map((game) => (
        <Card key={game.id} className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <img src={game.image} alt={game.name} className="w-full h-32 object-cover rounded-md mb-2" />
            <h3 className="font-semibold text-lg mb-1 text-white">{game.name}</h3>
            {type === 'played' && <p className='text-white'>{t('myGames.timesPlayed')}: {game.timesPlayed}</p>}
            {type === 'wins' && <p>{t('myGames.wins')}: {game.wins}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
        
      <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <CardHeader>
          <CardTitle>{t('myGames.availableBonuses')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.availableBonuses.map((bonus) => (
              <div key={bonus.id} className="bg-white/10 p-4 rounded-md">
                <h3 className="font-semibold text-lg mb-1">{bonus.name}</h3>
                <p className="text-sm mb-2">{bonus.description}</p>
                <Badge variant="secondary">{t('myGames.expiresOn')} {bonus.expiryDate}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <CardHeader>
          <CardTitle>{t('myGames.statistics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-400">{t('myGames.totalGamesPlayed')}</p>
              <p className="text-2xl font-bold">{userData.statistics.totalGamesPlayed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('myGames.totalWins')}</p>
              <p className="text-2xl font-bold">{userData.statistics.totalWins}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('myGames.biggestWin')}</p>
              <p className="text-2xl font-bold">${userData.statistics.biggestWin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('myGames.favoriteCategory')}</p>
              <p className="text-2xl font-bold">{userData.statistics.favoriteCategory}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <CardHeader>
          <CardTitle>{t('myGames.mostPlayed')}</CardTitle>
        </CardHeader>
        <CardContent>
          <GameList games={userData.mostPlayed} type="played" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <CardHeader>
          <CardTitle>{t('myGames.mostWins')}</CardTitle>
        </CardHeader>
        <CardContent>
          <GameList games={userData.mostWins} type="wins" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <CardHeader>
          <CardTitle>{t('myGames.favorites')}</CardTitle>
        </CardHeader>
        <CardContent>
          <GameList games={userData.favorites} type="favorites" />
        </CardContent>
      </Card>

    </div>
  );
}