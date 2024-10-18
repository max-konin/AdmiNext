import type { Meta, StoryObj } from '@storybook/react';

import { AdmiNext } from './AdmiNext';
import { clientResources, posts } from '../../data.mock';

const meta = {
  component: AdmiNext,
  args: {
    resourcesDefinition: clientResources,
    routePrefix: 'admin',
  },
} satisfies Meta<typeof AdmiNext>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  args: {
    resource: 'dashboard',
  },
};

export const ListView: Story = {
  args: {
    resource: 'posts',
    view: 'list',
    data: posts,
  },
};
