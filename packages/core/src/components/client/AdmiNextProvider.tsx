import { Provider, Toaster } from '../ui';

import { ReactNode } from 'react';

export const AdmiNextProvider = (props: { children: ReactNode }) => {
  return (
    <Provider>
      <Toaster />
      {props.children}
    </Provider>
  );
};
