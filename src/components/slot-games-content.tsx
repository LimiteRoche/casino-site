import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, Heart, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Game {
  id: string;
  name: string;
  image: string;
  provider: string;
  category: string;
  rtp: number;
  volatility: 'Low' | 'Medium' | 'High';
  rating: number;
  reviews: number;
  freeSpins?: number;
  isNew?: boolean;
  hasBigJackpot?: boolean;
}

interface Provider {
  name: string;
  games: Game[];
  jackpots: {
    grand: number;
    major: number;
    minor: number;
    mini: number;
  };
}

const providers: Provider[] = [
  {
    name: 'Microgaming',
    games: [
      { id: '1', name: 'Mega Moolah', provider: 'Microgaming', image: '/games/mega-moolah.jpg', category: 'Jackpot', rtp: 88.12, volatility: 'High', rating: 4.5, reviews: 1000, hasBigJackpot: true },
      { id: '2', name: 'Thunderstruck II', provider: 'Microgaming', image: '/games/thunderstruck-ii.jpg', category: 'Adventure', rtp: 96.65, volatility: 'Medium', rating: 4.7, reviews: 1200 },
    ],
    jackpots: { grand: 1000000, major: 50000, minor: 100, mini: 10 }
  },
  {
    name: 'NetEnt',
    games: [
      { id: '3', name: 'Starburst', provider: 'NetEnt', image: '/games/starburst.jpg', category: 'Popular', rtp: 96.1, volatility: 'Low', rating: 4.8, reviews: 1500, freeSpins: 50 },
      { id: '4', name: 'Gonzo\'s Quest', provider: 'NetEnt', image: '/games/gonzos-quest.jpg', category: 'Adventure', rtp: 95.97, volatility: 'Medium', rating: 4.6, reviews: 980 },
    ],
    jackpots: { grand: 500000, major: 25000, minor: 50, mini: 5 }
  },
];

const categories = ['All', 'Popular', 'New', 'Jackpot', 'Adventure'];

export default function SlotGamesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProvider, setActiveProvider] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const providerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProvider(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(providerRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        if (top < window.innerHeight) {
          controls.start({ opacity: 1, y: 0 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const filteredProviders = providers.map(provider => ({
    ...provider,
    games: provider.games.filter(game =>
      (activeCategory === 'All' || game.category === activeCategory) &&
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(provider => provider.games.length > 0);

  const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <Card className="relative overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative w-full h-48">
          <img src={game.image} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold">{game.name}</h3>
            <p className="text-gray-300 text-sm">{game.provider}</p>
          </div>
        </div>
        {game.freeSpins && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {game.freeSpins} Free Spins
          </div>
        )}
        {game.isNew && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}
        {game.hasBigJackpot && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            BIG JACKPOT
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id); }}
          className="absolute top-2 right-2 bg-white rounded-full p-1"
          aria-label={favorites.includes(game.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 ${favorites.includes(game.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-1" aria-label="Game info">
              <Info className="w-4 h-4 text-gray-500" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-purple-900 to-indigo-900 text-white border-white/20">
            <DialogHeader>
              <DialogTitle>{game.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <img src={game.image} alt={game.name} className="w-full rounded-lg" />
              <div>
                <p><strong>Provider:</strong> {game.provider}</p>
                <p><strong>Category:</strong> {game.category}</p>
                <p><strong>RTP:</strong> {game.rtp}%</p>
                <p><strong>Volatility:</strong> {game.volatility}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span>{game.rating.toFixed(1)} ({game.reviews} reviews)</span>
                </div>
              </div>
              <Button onClick={() => console.log(`Play ${game.name}`)}>Play Now</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 py-1 bg-gradient-to-b from-purple-900 to-indigo-900" ref={containerRef}>
      <div className=" top-0 text-black z-10 p-4">
        <Input
          type="search"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto mb-4"
        />
        <div className="flex justify-center space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {filteredProviders.map(provider => (
        <div
          key={provider.name}
          id={provider.name}
          ref={el => providerRefs.current[provider.name] = el}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold sticky top-24  z-10 p-2 text-white">{provider.name}</h2>
          <div className="sticky top-36 bg-black z-10 p-2 flex justify-between text-white">
            <div>
              <span className="font-bold">Jackpots:</span>
              <span className="ml-2">Grand: ${provider.jackpots.grand.toLocaleString()}</span>
              <span className="ml-2">Major: ${provider.jackpots.major.toLocaleString()}</span>
              <span className="ml-2">Minor: ${provider.jackpots.minor.toLocaleString()}</span>
              <span className="ml-2">Mini: ${provider.jackpots.mini.toLocaleString()}</span>
            </div>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex space-x-4">
              {provider.games.map(game => (
                <div key={game.id} className="w-64 flex-shrink-0">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}