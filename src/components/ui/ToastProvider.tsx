"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import ToastContainer from "@/components/ui/ToastContainer";

import type {
  Toast,
  ToastType,
} from "@/types/toast";

type ToastContextValue = {
  success: (
    title: string,
    description?: string
  ) => void;

  error: (
    title: string,
    description?: string
  ) => void;

  warning: (
    title: string,
    description?: string
  ) => void;

  info: (
    title: string,
    description?: string
  ) => void;
};

const ToastContext =
  createContext<
    ToastContextValue | undefined
  >(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] =
    useState<Toast[]>([]);

  const removeToast =
    useCallback((id: string) => {
      setToasts((current) =>
        current.filter(
          (toast) =>
            toast.id !== id
        )
      );
    }, []);

  const addToast =
    useCallback(
      (
        type: ToastType,
        title: string,
        description?: string
      ) => {
        const toast: Toast = {
          id: crypto.randomUUID(),

          type,

          title,

          description,

          duration: 4000,
        };

        setToasts((current) => [
          ...current,
          toast,
        ]);

        setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
      },
      [removeToast]
    );

  const value = useMemo(
    () => ({
      success: (
        title: string,
        description?: string
      ) =>
        addToast(
          "success",
          title,
          description
        ),

      error: (
        title: string,
        description?: string
      ) =>
        addToast(
          "error",
          title,
          description
        ),

      warning: (
        title: string,
        description?: string
      ) =>
        addToast(
          "warning",
          title,
          description
        ),

      info: (
        title: string,
        description?: string
      ) =>
        addToast(
          "info",
          title,
          description
        ),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={value}
    >
      {children}

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(
    ToastContext
  );

  if (!context) {
    throw new Error(
      "useToastContext must be used inside ToastProvider."
    );
  }

  return context;
}