// src/components/ProfileComponent.tsx
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';

import { useTranslations } from '../i18n/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { languageStore } from '@/stores/language-store';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  joinDate: string;
  lastLogin: string;
  accountStatus: string;
  phone: string;
  address: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

interface ProfileComponentProps {
  user: User;
}

export default function ProfileComponent({ user }: ProfileComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the editedUser data to your backend
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      preferences: {
        ...prev.preferences,
        [name]: type === 'checkbox' ? checked : value,
      }
    }));
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{t('profile.accountInfo')}</h2>
          <p><strong>{t('profile.username')}:</strong> {user.username}</p>
          <p><strong>{t('profile.email')}:</strong> {user.email}</p>
          <p><strong>{t('profile.name')}:</strong> {user.name}</p>
          <p><strong>{t('profile.joinDate')}:</strong> {user.joinDate}</p>
          <p><strong>{t('profile.lastLogin')}:</strong> {user.lastLogin}</p>
          <p><strong>{t('profile.accountStatus')}:</strong> {user.accountStatus}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{t('profile.contactInfo')}</h2>
          {isEditing ? (
            <>
              <Label htmlFor="phone">{t('profile.phone')}</Label>
              <Input
                id="phone"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
                className="mb-4 bg-white/10 border-white/20 text-white"
              />
              <Label htmlFor="address">{t('profile.address')}</Label>
              <Input
                id="address"
                name="address"
                value={editedUser.address}
                onChange={handleChange}
                className="mb-4 bg-white/10 border-white/20 text-white"
              />
            </>
          ) : (
            <>
              <p><strong>{t('profile.phone')}:</strong> {user.phone}</p>
              <p><strong>{t('profile.address')}:</strong> {user.address}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{t('profile.preferences')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">{t('profile.notifications')}</Label>
            <Switch
              id="notifications"
              name="notifications"
              checked={editedUser.preferences.notifications}
              onCheckedChange={(checked) => handleChange({ target: { name: 'notifications', type: 'checkbox', checked } } as any)}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter">{t('profile.newsletter')}</Label>
            <Switch
              id="newsletter"
              name="newsletter"
              checked={editedUser.preferences.newsletter}
              onCheckedChange={(checked) => handleChange({ target: { name: 'newsletter', type: 'checkbox', checked } } as any)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        {isEditing ? (
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
            {t('profile.save')}
          </Button>
        ) : (
          <Button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            {t('profile.edit')}
          </Button>
        )}
      </div>
    </div>
  );
}