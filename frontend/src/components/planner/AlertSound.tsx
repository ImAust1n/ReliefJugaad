import React from 'react';
import { useEffect, useRef, useState } from 'react';

const AlertSound = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    
    // Create oscillator for beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.value = 800; // Beep frequency
    gainNode.gain.value = 0.1; // Lower volume
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (!hasPlayed) {
      // Play two beeps
      oscillator.start();
      
      // Schedule the stop
      setTimeout(() => {
        oscillator.stop();
      }, 300);
      
      // Play second beep after a pause
      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        oscillator2.type = 'square';
        oscillator2.frequency.value = 800;
        oscillator2.connect(gainNode);
        oscillator2.start();
        setTimeout(() => oscillator2.stop(), 300);
      }, 500);
      
      setHasPlayed(true);
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [hasPlayed]);

  return null; // This component doesn't render anything
};

export default AlertSound;
