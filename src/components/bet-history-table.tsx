// src/components/BetHistoryTable.tsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from '@nanostores/react';
import { useTranslations } from '../i18n/utils';
import { languageStore } from '@/stores/language-store';

interface Bet {
  id: string;
  date: string;
  type: string;
  amount: number;
  outcome: 'win' | 'loss';
  profit: number;
}

export default function BetHistoryTable() {
  const [bets, setBets] = useState<Bet[]>([]);
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  useEffect(() => {
    // Simulating API call to fetch bet history
    const fetchBetHistory = async () => {
      // Replace this with actual API call
      const mockBets: Bet[] = [
        { id: '1', date: '2024-03-15', type: 'Sports', amount: 50, outcome: 'win', profit: 75 },
        { id: '2', date: '2024-03-14', type: 'Casino', amount: 20, outcome: 'loss', profit: -20 },
        { id: '3', date: '2024-03-13', type: 'Live Casino', amount: 100, outcome: 'win', profit: 180 },
      ];
      setBets(mockBets);
    };

    fetchBetHistory();
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('betHistory.date')}</TableHead>
            <TableHead>{t('betHistory.type')}</TableHead>
            <TableHead>{t('betHistory.amount')}</TableHead>
            <TableHead>{t('betHistory.outcome')}</TableHead>
            <TableHead>{t('betHistory.profitLoss')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bets.map((bet) => (
            <TableRow key={bet.id}>
              <TableCell>{bet.date}</TableCell>
              <TableCell>{bet.type}</TableCell>
              <TableCell>${bet.amount.toFixed(2)}</TableCell>
              <TableCell className={bet.outcome === 'win' ? 'text-green-400' : 'text-red-400'}>
                {bet.outcome.toUpperCase()}
              </TableCell>
              <TableCell className={bet.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                ${bet.profit.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}