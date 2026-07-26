'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  suggestions?: string[];
  confidence?: number;
}

export default function ChatInterface({ onAnalyzeStart, onAnalyzeEnd }: { onAnalyzeStart: () => void, onAnalyzeEnd: () => void }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'I am DRISHTI-X, your Investigation Copilot. What would you like to investigate today?',
      suggestions: [
        'Find chain snatching patterns in Mysuru.',
        'Who are repeat offenders in Belagavi?',
        'Predict burglary hotspots for this weekend.'
      ]
    }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);
    onAnalyzeStart();

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      onAnalyzeEnd();
      
      let aiResponse = "I have analyzed the intelligence records. I found 3 highly correlated incidents matching that pattern.";
      let suggestions = ["Show suspects", "Predict next incident", "Deploy patrol"];
      
      if (text.toLowerCase().includes('chain snatching')) {
        aiResponse = "I found 14 chain snatching cases in Mysuru over the last 30 days. 78% of these involved a black Pulsar two-wheeler.";
        suggestions = ["Show vehicle matches", "Map the hotspot", "Identify known associates"];
      }
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        confidence: 94,
        suggestions
      }]);
    }, 3500); // 3.5s analyzing simulation to let the spinner shine
  };

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-drishti-cyan/20 border border-drishti-cyan/30 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'}`}>
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-drishti-cyan uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Copilot
                    {msg.confidence && (
                      <span className="ml-auto flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3" />
                        {msg.confidence}% Confidence
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              
              {/* Follow-up Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="text-xs bg-white/5 hover:bg-drishti-cyan/20 border border-white/10 hover:border-drishti-cyan/50 text-gray-300 hover:text-drishti-cyan px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-[#0B0F19]">
        <div className="relative flex items-center">
          <button className="absolute left-3 text-gray-400 hover:text-drishti-cyan transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            disabled={isTyping}
            placeholder="Ask AI to investigate..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-drishti-cyan/50 focus:ring-1 focus:ring-drishti-cyan/50 transition-all"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={isTyping || !input.trim()}
            className="absolute right-2 p-1.5 bg-drishti-cyan text-[#0B0F19] rounded-full hover:bg-cyan-300 disabled:opacity-50 disabled:bg-gray-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
