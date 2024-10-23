import React from 'react';
import { useNotifyComponents } from '@/context/NotifyComponentsProvider';
import styles from './Alert.module.css'; // Aquí puedes tener tus estilos CSS

const Alert: React.FC = () => {
  const { alert } = useNotifyComponents(); // Obtener el estado de la alerta del contexto

  if (!alert.isOpen) return null; // Si la alerta no está abierta, no renderiza nada

  return (
    <div className={`${styles.alert} ${styles[alert.type]}`}>
      <p>{alert.message}</p>
    </div>
  );
};

export default Alert;