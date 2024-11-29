// src/components/Promotions.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslations } from '../i18n/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gift, Users } from 'lucide-react';
import { languageStore } from '@/stores/language-store';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'reward' | 'deposit' | 'play' | 'referral';
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Welcome Bonus',
    description: 'Get 100% bonus up to $500 on your first deposit!',
    type: 'welcome'
  },
  {
    id: '2',
    title: 'Loyalty Rewards',
    description: 'Earn points as you play and exchange them for bonuses!',
    type: 'reward'
  },
  {
    id: '3',
    title: 'Deposit Bonus',
    description: 'Deposit today and receive 20% extra!',
    type: 'deposit'
  },
  {
    id: '4',
    title: 'Play & Win',
    description: 'Play your favorite games to receive a special bonus!',
    type: 'play'
  },
  {
    id: '5',
    title: 'Refer a Friend',
    description: 'Get $50 for each friend you refer!',
    type: 'referral'
  }
];

export default function Promotions() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000); // Change promotion every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const currentPromo = promotions[currentPromoIndex];

  const getPromoIcon = (type: Promotion['type']) => {
    switch (type) {
      case 'welcome':
      case 'reward':
      case 'deposit':
      case 'play':
        return <Gift className="h-6 w-6" />;
      case 'referral':
        return <Users className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-purple-900 to-indigo-900 p-4 md:p-4 rounded-lg shadow-lg">
      <Card className="bg-transparent border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center">
            {getPromoIcon(currentPromo.type)}
            <span className="ml-2">{t(`promotions.${currentPromo.type}Title`)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg md:text-xl text-white/90">
            {t(`promotions.${currentPromo.type}Description`)}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
            {t('promotions.claimNow')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <div className="flex justify-center mt-4 space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentPromoIndex ? 'bg-yellow-500' : 'bg-white/50'
            }`}
            onClick={() => setCurrentPromoIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}