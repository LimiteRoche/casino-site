import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationBanner: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Simular la obtención de notificaciones desde una API
    const mockNotifications: Notification[] = [
      { id: '1', title: '¡Bono de bienvenida!', message: 'Obtén un 100% de bonificación en tu primer depósito', type: 'success' },
      { id: '2', title: 'Nuevo juego', message: 'Prueba nuestro nuevo juego "Tesoros del Faraón"', type: 'info' },
      { id: '3', title: 'Torneo de slots', message: 'Participa en nuestro torneo semanal y gana grandes premios', type: 'warning' },
    ];

    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const closeNotification = () => {
    setCurrentNotification(null);
    setNotifications(prevNotifications => prevNotifications.slice(1));
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  if (!currentNotification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 p-4 ${getBackgroundColor(currentNotification.type)} text-white shadow-lg`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{currentNotification.title}</h3>
            <p>{currentNotification.message}</p>
          </div>
          <button onClick={closeNotification} className="p-1 hover:bg-white/20 rounded-full">
            <X size={24} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationBanner;