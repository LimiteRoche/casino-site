// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslations } from '../i18n/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { languageStore } from '@/stores/language-store';
import { Textarea } from './ui/textarea';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const $language = useStore(languageStore);
  const t = useTranslations($language);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-purple-900 to-indigo-900 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">{t('contact.name')}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="email">{t('contact.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="subject">{t('contact.subject')}</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="message">{t('contact.message')}</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="bg-white/10 border-white/20 text-white"
            rows={5}
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black">
        {t('contact.send')}
      </Button>
    </form>
  );
}