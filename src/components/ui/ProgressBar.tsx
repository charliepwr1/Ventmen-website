interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple text */}
      <div className="sm:hidden text-center">
        <span className="text-sm text-charcoal/60">
          Step {currentStep} of {totalSteps}:{" "}
          <span className="text-navy font-medium">
            {stepLabels[currentStep - 1]}
          </span>
        </span>
      </div>

      {/* Desktop: Full progress bar */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isCompleted
                      ? "bg-orange text-white"
                      : isCurrent
                        ? "bg-navy text-white"
                        : "bg-cream-dark text-charcoal/50"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isCurrent ? "text-navy font-medium" : "text-charcoal/50"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    isCompleted ? "bg-orange" : "bg-cream-dark"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
