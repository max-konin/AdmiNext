import { AdmiNextProvider } from '@adminext/core/client';
import { ReactNode } from 'react';

export default function AdminLayout(props: { children: ReactNode }) {
  return <AdmiNextProvider>{props.children}</AdmiNextProvider>;
}
