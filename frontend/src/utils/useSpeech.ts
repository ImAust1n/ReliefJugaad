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
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true; // allow partial results
    recognition.continuous = true; // allow longer speech
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
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
      setListening(false);
      setInterimTranscript('');
    };
    recognition.onerror = (e: any) => {
      setListening(false);
      setInterimTranscript('');
      alert('Speech recognition error: ' + (e.error || 'Unknown error'));
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setInterimTranscript('');
  };

  return { listening, startListening, stopListening, interimTranscript };
}

export function useSpeechSynthesis() {
  const speak = (text: string) => {
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
