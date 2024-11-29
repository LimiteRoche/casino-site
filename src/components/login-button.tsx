// src/components/LoginButton.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import LoginModal from './login-modal';


export default function LoginButton() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => setIsLoginModalOpen(true)} 
        className="text-white hover:text-black flex items-center space-x-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>
        </svg>
        <span>Login</span>
      </Button>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}