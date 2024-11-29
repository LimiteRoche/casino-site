import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, Heart, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlotGame {
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

const MOCK_GAMES: SlotGame[] = [
  { id: '1', name: 'Dons Fortune', image: '/games/dons-fortune.jpg', provider: 'SpinHound', category: 'Popular', rtp: 96.1, volatility: 'Low', rating: 4.5, reviews: 1000, freeSpins: 50 },
  { id: '2', name: 'Zombie Zillionaire', image: '/games/zombie-zillionaire.jpg', provider: 'SpinHound', category: 'Adventure', rtp: 95.97, volatility: 'Medium', rating: 4.7, reviews: 1200, hasBigJackpot: true },
  { id: '3', name: 'Rebel Reels', image: '/games/rebel-reels.jpg', provider: 'SpinHound', category: 'Egyptian', rtp: 96.21, volatility: 'High', rating: 4.6, reviews: 980 },
  { id: '4', name: 'Monkey Money', image: '/games/monkey-money.jpg', provider: 'SpinHound', category: 'Jackpot', rtp: 88.12, volatility: 'High', rating: 4.4, reviews: 1500, hasBigJackpot: true },
  { id: '5', name: 'Spin Punch!', image: '/games/spinpunch2.jpg', provider: 'Play\'n GO', category: 'Sci-Fi', rtp: 96.51, volatility: 'High', rating: 4.8, reviews: 800, isNew: true },
  { id: '6', name: 'Flamenco', image: '/games/flamenco.jpg', provider: 'NetEnt', category: 'Western', rtp: 96.82, volatility: 'High', rating: 4.9, reviews: 1100 },
  { id: '7', name: 'Flamenco 2', image: '/games/flamenco2.jpg', provider: 'Pragmatic Play', category: 'Fishing', rtp: 96.71, volatility: 'Medium', rating: 4.3, reviews: 750, freeSpins: 20 },
  { id: '8', name: 'Spice & Spin', image: '/games/spiceandspin.jpg', provider: 'Pragmatic Play', category: 'Candy', rtp: 96.48, volatility: 'High', rating: 4.7, reviews: 950 },
  { id: '9', name: 'Spin Island', image: '/games/spin-island.jpg', provider: 'Pragmatic Play', category: 'Candy', rtp: 96.48, volatility: 'High', rating: 4.7, reviews: 950 },
  { id: '10', name: 'Cash Flow', image: '/games/cash-flow.jpg', provider: 'Play\'n GO', category: 'Sci-Fi', rtp: 96.51, volatility: 'High', rating: 4.8, reviews: 800, isNew: true },
];

const categories = ['Categories', 'Popular', 'New', 'Jackpot', 'Adventure', 'Egyptian', 'Sci-Fi', 'Western', 'Fishing', 'Candy'];
const providers = ['Providers', 'NetEnt', 'Microgaming', 'Play\'n GO', 'Pragmatic Play'];

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div ref={imgRef} className={`${className} bg-gray-200`}>
      {isLoaded && <img src={src} alt={alt} className={className} loading="lazy" />}
    </div>
  );
};

const SlotGames: React.FC = () => {
  const [games, setGames] = useState<SlotGame[]>(MOCK_GAMES);
  const [featuredGames, setFeaturedGames] = useState<SlotGame[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProvider, setActiveProvider] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredGamesRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const filtered = MOCK_GAMES.filter(game => 
      (activeCategory === 'All' || game.category === activeCategory) &&
      (activeProvider === 'All' || game.provider === activeProvider) &&
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGames(filtered);
  }, [activeCategory, activeProvider, searchTerm]);

  useEffect(() => {
    setFeaturedGames(MOCK_GAMES);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      if (isAutoScrolling && featuredGamesRef.current) {
        featuredGamesRef.current.scrollLeft += 1;
        if (featuredGamesRef.current.scrollLeft + featuredGamesRef.current.clientWidth >= featuredGamesRef.current.scrollWidth) {
          featuredGamesRef.current.scrollLeft = 0;
        }
      }
    }, 10);
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
  };

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredGamesRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      featuredGamesRef.current.scrollLeft += scrollAmount;
    }
  };

  const GameCard: React.FC<{ game: SlotGame; isFeatured?: boolean }> = ({ game, isFeatured }) => (
    <motion.div
      className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 ${isFeatured ? 'w-72 flex-shrink-0' : ''}`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-48" >
        <LazyImage src={game.image} alt={game.name} className="w-full h-full object-cover" />
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
        <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
          NEW
        </div>
      )}
      {game.hasBigJackpot && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
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
            <LazyImage src={game.image} alt={game.name} className="w-full rounded-lg" />
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
            <Button onClick={() => console.log('Play game')} className="bg-blue-500 text-white font-bold">Play Game</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );

  return (
    <div className="py-1 bg-gradient-to-b from-purple-900 to-indigo-900" ref={containerRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Popular</h2>
        <div className="relative mb-12">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white"
            onClick={() => scrollFeatured('left')}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <div 
            className="overflow-x-auto whitespace-nowrap" 
            style={{ overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            ref={featuredGamesRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <div className="flex space-x-4 p-4">
              {featuredGames.map(game => (
                <GameCard key={game.id} game={game} isFeatured />
              ))}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white"
            onClick={() => scrollFeatured('right')}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        <div className="sticky top-0 z-20 py-4 bg-purple-900">
          <div className="flex items-center justify-between space-x-4">
            <Input 
              type="text" 
              placeholder="Search games" 
              className="hidden md:flex md:flex-1" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
            <select 
              className="flex-1 p-2 bg-white text-gray-700 rounded-md" 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select 
              className="flex-1 p-2 bg-white text-gray-700 rounded-md" 
              value={activeProvider} 
              onChange={(e) => setActiveProvider(e.target.value)}
            >
              {providers.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotGames;