'use client';

interface SuggestedFollowUpsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestedFollowUps({ suggestions, onSelect }: SuggestedFollowUpsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {suggestions.map((suggestion, idx) => (
        <button
          key={`${suggestion}-${idx}`}
          onClick={() => onSelect(suggestion)}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-300 transition-colors hover:border-drishti-cyan/50 hover:bg-drishti-cyan/20 hover:text-drishti-cyan"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
