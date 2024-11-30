import { createContext, PropsWithChildren } from 'react';
import { AdmiNextContextType } from '../types';

export const AdminExtensionContext = createContext<AdmiNextContextType | null>(
  null
);

export const AdmiNextContextProvider = ({
  children,
  ...props
}: AdmiNextContextType & PropsWithChildren) => {
  return (
    <AdminExtensionContext.Provider value={props}>
      {children}
    </AdminExtensionContext.Provider>
  );
};
