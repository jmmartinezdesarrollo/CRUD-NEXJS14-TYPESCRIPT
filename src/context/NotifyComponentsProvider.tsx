"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertState = {
  isOpen: boolean;
  message: string;
  type: "danger" | "info" | "success" | "warning";
};

type DialogAction = {
  label: string;
  value: string;
  onClick: () => void;
};

type DialogState = {
  isOpen: boolean;
  title: string;
  message: string;
  actions: DialogAction[];
  onClose: () => void;
};

type NotifyContextProps = {
  alert: AlertState;
  showAlert: (
    message: string,
    type: "danger" | "info" | "success" | "warning"
  ) => void;
  dialog: DialogState;
  showDialog: (title: string, message: string, actions: DialogAction[]) => void;
};

const NotifyContext = createContext<NotifyContextProps | undefined>(undefined);

export const NotifyComponentsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    title: "",
    message: "",
    actions: [],
    onClose: () => {},
  });

  const showAlert = (
    message: string,
    type: "danger" | "info" | "success" | "warning"
  ) => {
    setAlert({ isOpen: true, message, type });
    setTimeout(() => setAlert((prev) => ({ ...prev, isOpen: false })), 5000);
  };

  const showDialog = (
    title: string,
    message: string,
    actions: DialogAction[]
  ) => {
    setDialog({
      isOpen: true,
      title,
      message,
      actions,
      onClose: () => setDialog((prev) => ({ ...prev, isOpen: false })),
    });
  };

  return (
    <NotifyContext.Provider value={{ alert, showAlert, dialog, showDialog }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotifyComponents = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error(
      "useNotifyComponents debe usarse dentro de NotifyComponentsProvider"
    );
  }
  return context;
};
