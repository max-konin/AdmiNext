import { Provider } from '../ui';
import { Toaster } from '../ui/toaster';

import { ReactNode } from 'react';

export const AdmiNextProvider = (props: { children: ReactNode }) => {
  return (
    <Provider>
      <Toaster />
      {props.children}
    </Provider>
  );
};
