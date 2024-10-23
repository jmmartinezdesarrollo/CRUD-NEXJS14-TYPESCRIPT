"use client";

import React from "react";
import { useNotifyComponents } from '@/context/NotifyComponentsProvider';

const Dialog: React.FC = () => {
  const { dialog } = useNotifyComponents(); 

  if (!dialog.isOpen) return null;

  return (
    <dialog open>
      <header>{dialog.title}</header>
      <form method="dialog">
        <p>{dialog.message}</p>
        <menu>
          {dialog.actions.map((action, index) => (
            <button key={index} value={action.value} onClick={() => {
              action.onClick();
              dialog.onClose(); // Llama a onClose después de ejecutar la acción
            }}>
              {action.label}
            </button>
          ))}
        </menu>
      </form>
    </dialog>
  );
};

export default Dialog;
