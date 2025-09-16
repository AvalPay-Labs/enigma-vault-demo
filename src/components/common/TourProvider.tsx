import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useNavigate } from "react-router-dom";

type TourContextType = {
  start: () => void;
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useAppTour = () => {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useAppTour must be used within TourProvider");
  return ctx;
};

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const [run, setRun] = useState(false);
  const navigate = useNavigate();
  const scrollOffset = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerHeight) {
      return Math.round(window.innerHeight / 3); // deja ~1/3 de viewport por encima
    }
    return 160;
  }, []);

  const steps: Step[] = useMemo(
    () => [
      {
        target: "#tour-fuji",
        content: "🌐 Fuji Testnet: connect the app to Avalanche Fuji test network.",
        disableBeacon: true,
      },
      {
        target: "#tour-role-user",
        content: "👤 User: pick this role if you will operate as an end user.",
        placement: "right",
      },
      {
        target: "#tour-role-company",
        content: "🏢 Company: manage your organization and configurations.",
        placement: "right",
      },
      {
        target: "#tour-role-auditor",
        content: "🕵️ Auditor: request reviews and validate transactions with permissions.",
        placement: "right",
      },
      {
        target: "#tour-help",
        content: "📘 Help & FAQ: find guides and common answers.",
      },
      {
        target: "#tour-about",
        content: "ℹ️ About: learn more about the project and its purpose.",
      },
    ],
    []
  );

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { status } = data;

      // Finalizar/cerrar sin redirecciones ni cambios de ruta
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRun(false);
      }
    },
    [navigate]
  );

  const start = useCallback(() => {
    setRun(true);
  }, []);

  return (
    <TourContext.Provider value={{ start }}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        scrollToFirstStep
        scrollOffset={scrollOffset}
        disableOverlayClose
        spotlightPadding={8}
        styles={{
          options: {
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-glass)",
            background: "#ffffff", // sólido, sin blur
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--glass-border))",
          },
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            background: "linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--primary)))",
            color: "hsl(var(--primary-foreground))",
            border: "1px solid hsl(var(--primary-glow) / 0.5)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 0 24px hsl(var(--primary-glow) / 0.25)",
          },
          buttonBack: {
            background: "#ffffff",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--glass-border))",
            borderRadius: "var(--radius-sm)",
          },
          buttonClose: {
            color: "hsl(var(--muted-foreground))",
          },
        }}
        locale={{
          back: "Back ⬅️",
          close: "Close",
          last: "Finish ✅",
          next: "Next ➡️",
          skip: "Skip",
        }}
        callback={handleCallback}
      />
    </TourContext.Provider>
  );
};
