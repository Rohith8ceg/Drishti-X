'use client';

import { useEffect, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

export default function VoiceToggle({ onTranscript }: { onTranscript: (value: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en-US' | 'kn-IN'>('en-US');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as typeof window & {
      webkitSpeechRecognition?: new () => {
        start: () => void;
        stop: () => void;
        onresult: ((event: { results: ArrayLike<Array<{ transcript: string }> > }) => void) | null;
        onerror?: ((event: unknown) => void) | null;
        lang: string;
      };
    }).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim();
      if (transcript) {
        onTranscript(transcript);
      }
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, language, onTranscript]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsListening((prev) => !prev)}
        className={`rounded-full p-2 transition-colors ${isListening ? 'bg-drishti-cyan/20 text-drishti-cyan' : 'bg-white/5 text-gray-400 hover:text-drishti-cyan'}`}
      >
        <Mic className="w-4 h-4" />
      </button>
      <button
        onClick={() => setLanguage((prev) => (prev === 'en-US' ? 'kn-IN' : 'en-US'))}
        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300"
      >
        <Volume2 className="w-3.5 h-3.5" />
        {language === 'en-US' ? 'EN' : 'KN'}
      </button>
    </div>
  );
}
