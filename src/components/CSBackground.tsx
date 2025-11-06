import { memo } from "react";

export const CSBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Professional grid pattern - pure CSS, no JS */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Static gradient orbs - CSS only, no animation */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-3xl"
        style={{ top: "5%", left: "0%", transform: "translate(-20%, -20%)" }}
      />
      
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-accent-code/[0.03] blur-3xl"
        style={{ bottom: "5%", right: "0%", transform: "translate(20%, 20%)" }}
      />

      {/* Minimal animated glow - single CSS animation */}
      <div 
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse"
        style={{ top: "30%" }}
      />
    </div>
  );
});

CSBackground.displayName = "CSBackground";
