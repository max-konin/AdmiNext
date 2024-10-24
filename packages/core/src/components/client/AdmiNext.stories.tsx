import type { Meta, StoryObj } from '@storybook/react';

import { AdmiNext } from './AdmiNext';
import { resources, posts } from '../../data.mock';

const meta = {
  component: AdmiNext,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    resourcesDefinition: resources,
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
    loaderData: { data: posts },
  },
};

export const EditView: Story = {
  args: {
    resource: 'posts',
    view: 'edit',
    loaderData: { data: posts[0] },
  },
};
