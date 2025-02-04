import { CustomPageDefinition } from '@adminext/core';
import { CustomPageSecondExample } from './CustomPageSecondExample';
import { CustomPageFirstExample } from './CustomPageFirstExample';

export const customPages: CustomPageDefinition[] = [
  {
    title: 'Custom Page First',
    route: 'custom-page-first',
    render: () => <CustomPageFirstExample />,
  },
  {
    title: 'Custom Page Second',
    route: 'custom-page-second',
    render: () => <CustomPageSecondExample />,
  },
];
