// src/components/GameReviewComponent.tsx
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslations } from '../i18n/utils';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';
import { languageStore } from '@/stores/language-store';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: Review[];
}

interface GameReviewComponentProps {
  game: Game;
}

export default function GameReviewComponent({ game }: GameReviewComponentProps) {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleReviewSubmit = () => {
    // Here you would typically send the review to your backend
    console.log('Review submitted:', { rating: userRating, comment: userReview });
    // Reset form after submission
    setUserRating(0);
    setUserReview('');
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img src={game.image} alt={game.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div className="md:w-2/3">
          <p className="text-lg mb-4">{game.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">{game.rating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.round(game.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-400">({game.reviews.length} {t('gameReview.reviews')})</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{t('gameReview.writeReview')}</h2>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`w-8 h-8 ${star <= userRating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400 focus:outline-none`}
              >
                <Star className={star <= userRating ? 'fill-current' : ''} />
              </button>
            ))}
          </div>
          <Textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            placeholder={t('gameReview.reviewPlaceholder')}
            className="mb-4 bg-white/10 border-white/20 text-white"
            rows={4}
          />
          <Button onClick={handleReviewSubmit} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            {t('gameReview.submitReview')}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{t('gameReview.userReviews')}</h2>
        {game.reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="font-bold mr-2">{review.user}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}