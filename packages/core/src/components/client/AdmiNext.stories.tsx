import type { Meta, StoryObj } from '@storybook/react';

import { AdmiNext } from './AdmiNext';
import { resources, posts } from '../../data.mock';
import { Provider } from '../ui';
import { customPages } from './CustomPages';

const withProvider = (Story: any) => (
  <Provider>
    <Story />
  </Provider>
);

const meta = {
  component: AdmiNext,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    resourcesDefinition: resources,
    routePrefix: 'admin',
    slots: {
      user: () => 'Current user',
    },
    customPages: customPages,
  },
  decorators: [withProvider],
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

export const CustomPage: Story = {
  args: {
    resource: 'custom-page',
    title: customPages[0]?.title,
    route: customPages[0]?.route,
    render: customPages[0]?.render,
  },
};
