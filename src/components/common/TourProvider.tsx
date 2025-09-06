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
      // Paso 1: Fuji Testnet
      {
        target: "#tour-fuji",
        content: "🌐 Fuji Testnet: conecta la app a la red de pruebas Fuji.",
        disableBeacon: true,
      },
      // Paso 2: Botón Usuario (rol Usuario en homepage)
      {
        target: "#tour-role-user",
        content: "👤 Usuario: usa esta opción si operarás la app como usuario final.",
        placement: "right",
      },
      // Paso 3: Botón Empresa (rol Empresa en homepage)
      {
        target: "#tour-role-company",
        content: "🏢 Empresa: selecciona esta opción para gestionar tu organización y sus configuraciones.",
        placement: "right",
      },
      // Paso 4: Botón Auditor (rol Auditor en homepage)
      {
        target: "#tour-role-auditor",
        content: "🕵️ Auditor: realiza revisiones, reportes y validaciones de auditoría.",
        placement: "right",
      },
      // Paso 5: Opción de idioma
      {
        target: "#tour-lang",
        content: "🌍 Idioma: cambia el idioma de la interfaz cuando lo necesites.",
      },
      // Paso 6: Iniciar sesión (botón en el header)
      {
        target: "#tour-login",
        content: "🔐 Iniciar sesión: accede con tu cuenta para comenzar.",
      },
      // Paso 7: Ayuda y Preguntas frecuentes
      {
        target: "#tour-help",
        content: "📘 Ayuda y Preguntas frecuentes: consulta guías y soluciones paso a paso.",
      },
      // Paso 8: Acerca de
      {
        target: "#tour-about",
        content: "ℹ️ Acerca de: conoce más sobre el proyecto y su propósito.",
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
          back: "Atrás ⬅️",
          close: "Cerrar",
          last: "Finalizar ✅",
          next: "Siguiente ➡️",
          skip: "Saltar",
        }}
        callback={handleCallback}
      />
    </TourContext.Provider>
  );
};
