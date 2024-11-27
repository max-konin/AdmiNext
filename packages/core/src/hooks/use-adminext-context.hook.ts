import { useContext } from 'react';
import { AdminExtensionContext } from '../contexts';

export const useAdmiNextContext = () => {
  const context = useContext(AdminExtensionContext);

  if (!context) {
    throw new Error(
      'useAdmiNextContext must be used within a AdmiNextContextProvider'
    );
  }

  return context;
};
