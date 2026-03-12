import { useState } from "react";
import { toast } from "sonner";
import IntroScreen from "@/components/journal/IntroScreen";
import PromptScreen from "@/components/journal/PromptScreen";
import EntryRevealScreen from "@/components/journal/EntryRevealScreen";
import ReflectionScreen from "@/components/journal/ReflectionScreen";
import CompletionScreen from "@/components/journal/CompletionScreen";

const PROMPTS = [
  {
    prompt: "What part of your identity are you grateful for today?",
    hints: [
      "I'm grateful for my courage to live authentically.",
      "I'm grateful for the community that supports me.",
      "I'm grateful for the resilience I've developed.",
    ],
  },
  {
    prompt: "What experience or journey helped shape who you are?",
    hints: [
      "My experiences helped me grow stronger.",
      "My journey helped me understand others better.",
    ],
  },
  {
    prompt: "What strength in yourself are you grateful for?",
    hints: [
      "My resilience.",
      "My empathy.",
      "My creativity.",
    ],
  },
];

interface Entry {
  text: string;
  sticker: string | null;
}

type Screen = "intro" | "prompt" | "reveal" | "reflection" | "completion";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [promptIndex, setPromptIndex] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleStart = () => setScreen("prompt");

  const handleSubmit = (text: string) => {
    setEntries((prev) => [...prev, { text, sticker: null }]);
    setScreen("reveal");
  };

  const handleStickerSelect = (s: string) => {
    setEntries((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { ...copy[copy.length - 1], sticker: s };
      return copy;
    });
  };

  const handleRevealContinue = () => {
    if (promptIndex < PROMPTS.length - 1) {
      setPromptIndex((p) => p + 1);
      setScreen("prompt");
    } else {
      setScreen("reflection");
    }
  };

  const handleReflectionComplete = () => setScreen("completion");

  const handleSave = () => {
    toast.success("Journal saved! 🌈");
  };

  const handleRestart = () => {
    setScreen("intro");
    setPromptIndex(0);
    setEntries([]);
  };

  switch (screen) {
    case "intro":
      return <IntroScreen onStart={handleStart} />;
    case "prompt":
      return (
        <PromptScreen
          prompt={PROMPTS[promptIndex].prompt}
          hints={PROMPTS[promptIndex].hints}
          current={promptIndex + 1}
          total={PROMPTS.length}
          isLast={promptIndex === PROMPTS.length - 1}
          onSubmit={handleSubmit}
        />
      );
    case "reveal":
      return (
        <EntryRevealScreen
          index={entries.length - 1}
          text={entries[entries.length - 1].text}
          sticker={entries[entries.length - 1].sticker}
          onStickerSelect={handleStickerSelect}
          onContinue={handleRevealContinue}
          isLast={promptIndex === PROMPTS.length - 1}
        />
      );
    case "reflection":
      return <ReflectionScreen entries={entries} onComplete={handleReflectionComplete} />;
    case "completion":
      return <CompletionScreen entries={entries} onSave={handleSave} onRestart={handleRestart} />;
  }
};

export default Index;
