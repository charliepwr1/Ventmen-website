import type { QuoteData, HouseType } from "@/types";
import { HOUSE_TYPES } from "@/lib/constants";

interface Step1HomeProps {
  data: QuoteData;
  updateData: (updates: Partial<QuoteData>) => void;
  onNext: () => void;
}

// Emojis used as visual card icons, matching existing pattern and approved wireframes.
// Replace with SVG icons later if preferred.
const houseTypeCards: { value: HouseType; icon: string; subtitle: string }[] = [
  { value: "detached", icon: "\u{1F3E0}", subtitle: "Single family home" },
  { value: "townhome", icon: "\u{1F3D8}", subtitle: "Attached or semi-detached" },
  { value: "apartment", icon: "\u{1F3E2}", subtitle: "Multi-unit building" },
];

export default function Step1Home({
  data,
  updateData,
  onNext,
}: Step1HomeProps) {
  const handleSelect = (type: HouseType) => {
    const config = HOUSE_TYPES[type];
    updateData({
      houseType: type,
      vents: config.defaultVents,
    });
    // Auto-advance after selection
    setTimeout(onNext, 150);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <p className="text-center text-sm text-charcoal/50 mb-4">
        Get your price in 60 seconds
      </p>
      <h1 className="font-display text-2xl font-bold text-navy text-center mb-8">
        What type of home do you have?
      </h1>

      <div className="flex flex-col gap-3">
        {houseTypeCards.map((card) => {
          const isSelected = data.houseType === card.value;
          return (
            <button
              key={card.value}
              type="button"
              onClick={() => handleSelect(card.value)}
              className={`w-full p-5 border-2 rounded-lg text-left transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-orange bg-orange/5 shadow-md"
                  : "border-cream-dark bg-white hover:border-orange/50"
              }`}
            >
              <span className="text-4xl">{card.icon}</span>
              <div>
                <span className="block font-bold text-navy">
                  {HOUSE_TYPES[card.value].label}
                </span>
                <span className="block text-sm text-charcoal/50">
                  {card.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-charcoal/40 mt-6">
        Tap to select
      </p>
    </div>
  );
}
