import { CustomPageDefinition } from '@adminext/core';
import { CustomPage1 } from './custom-page-1';
import { CustomPage2 } from './custom-page-2';

export const customPages: CustomPageDefinition[] = [
  {
    title: 'Custom Page 1',
    route: 'custom-page-1',
    render: () => <CustomPage1 />,
  },
  {
    title: 'Custom Page 2',
    route: 'custom-page-2',
    render: () => <CustomPage2 />,
  },
];
