// ToastContext.tsx
import { createContext, useCallback, useRef, useContext } from "react";
import { Toast } from "primereact/toast";

type ToastFunction = (
  severity: "success" | "info" | "warn" | "error" | undefined,
  summary: string,
  detail: string,
) => void | never;

const ToastContext = createContext<ToastFunction | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ToastProvider = ({ children }) => {
  const toast = useRef<Toast>(null);

  const showToast: ToastFunction = useCallback((severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail });
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastFunction => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
