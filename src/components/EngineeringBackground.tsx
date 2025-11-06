import { memo } from "react";

export const EngineeringBackground = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Static circuit pattern - pure CSS, no animation */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M20,20 L80,20 L80,80 L20,80 L20,40 L60,40 L60,60 L40,60"
                stroke="hsl(var(--primary) / 0.1)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="20" cy="20" r="1.5" fill="hsl(var(--primary) / 0.15)" />
              <circle cx="80" cy="80" r="1.5" fill="hsl(var(--primary) / 0.15)" />
              <circle cx="60" cy="40" r="1.5" fill="hsl(var(--primary) / 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Static gradient orbs - CSS only */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-3xl"
        style={{ top: "10%", left: "5%" }}
      />
      
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent-code/[0.03] blur-3xl"
        style={{ bottom: "10%", right: "5%" }}
      />
    </div>
  );
});

EngineeringBackground.displayName = "EngineeringBackground";