import { Button } from "@/components/ui/button";

interface Entry {
  text: string;
  sticker: string | null;
}

const CARD_COLORS = [
  "card-pastel-red",
  "card-pastel-orange",
  "card-pastel-yellow",
  "card-pastel-green",
  "card-pastel-blue",
  "card-pastel-purple",
];

const CompletionScreen = ({
  entries,
  onSave,
  onRestart,
}: {
  entries: Entry[];
  onSave: () => void;
  onRestart: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen rainbow-bg px-6 py-10">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="relative flex justify-center items-end gap-2 h-40">
          {entries.map((entry, i) => {
            const angle = (i - 1) * 18;
            const translateY = Math.abs(i - 1) * 10;
            return (
              <div
                key={i}
                className={`${CARD_COLORS[i]} rounded-xl p-3 w-24 shadow-md rainbow-glow transition-all duration-700`}
                style={{
                  transform: `rotate(${angle}deg) translateY(-${translateY}px)`,
                }}
              >
                <p className="journal-font text-[10px] text-foreground leading-tight line-clamp-3 text-justify">
                  {entry.text}
                </p>
                {entry.sticker && <span className="text-lg mt-1 block">{entry.sticker}</span>}
              </div>
            );
          })}
        </div>

        <h2 className="text-xl text-foreground">
          Your gratitude reflects the many colors of who you are.
        </h2>
        <p className="text-3xl">🌈</p>

        <div className="space-y-3">
          <Button variant="pride" size="lg" className="w-full" onClick={onSave}>
            Save My Journal
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground"
            onClick={onRestart}
          >
            Write Again Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
