import { useRef, useState } from 'react';

// TypeScript compatibility for browsers without native types
// @ts-ignore
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
type SpeechRecognitionType = typeof SpeechRecognition;
type SpeechRecognitionEventType = {
  results: { 0: { 0: { transcript: string } } };
};

export function useSpeechRecognition(onResult: (result: string) => void) {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  const startListening = () => {
    console.log('[SpeechRecognition] startListening called');
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      console.error('[SpeechRecognition] Not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true; // allow partial results
    recognition.continuous = true; // allow longer speech
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      console.log('[SpeechRecognition] onresult', event);
      let finalTranscript = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }
      setInterimTranscript(interim);
      if (finalTranscript) {
        setInterimTranscript('');
        onResult(finalTranscript.trim());
      }
    };
    recognition.onend = () => {
      console.log('[SpeechRecognition] onend');
      setListening(false);
      setInterimTranscript('');
    };
    recognition.onerror = (e: any) => {
      console.error('[SpeechRecognition] onerror', e);
      setListening(false);
      setInterimTranscript('');
      alert('Speech recognition error: ' + (e.error || 'Unknown error'));
    };
    recognitionRef.current = recognition;
    console.log('[SpeechRecognition] recognition started');
    setListening(true);
    recognition.start();
    console.log('[SpeechRecognition] recognition.start() called');
  };

  const stopListening = () => {
    console.log('[SpeechRecognition] stopListening called');
    recognitionRef.current?.stop();
    setListening(false);
    setInterimTranscript('');
  };

  return { listening, startListening, stopListening, interimTranscript };
}

export function useSpeechSynthesis() {
  // Log when TTS is called
  const speak = (text: string) => {
    console.log('[SpeechSynthesis] speak called with:', text);
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  return { speak };
}
