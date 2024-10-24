import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataProvider } from './DataProvider';
import { CRUDPages } from '../../types';
import { posts, resources } from '../../data.mock';

const notFoundMock = vi.fn();

vi.mock('next/navigation', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('next/navigation')>()),
    notFound: () => notFoundMock(),
  };
});

describe('DataProvider', () => {
  const mockChildren = vi.fn().mockReturnValue(<div>Child Component</div>);

  beforeEach(() => {
    mockChildren.mockClear();
    notFoundMock.mockClear();
  });

  describe('when there are no "resource" params', () => {
    it('renders the dashboard', async () => {
      render(
        <DataProvider
          resources={resources}
          routeProps={{ params: {}, searchParams: {} }}
        >
          {mockChildren}
        </DataProvider>
      );

      await waitFor(() => {
        expect(mockChildren).toHaveBeenCalledWith({
          resource: 'dashboard',
        });
      });
    });
  });

  describe('when "resource" params contains 1 segment', () => {
    it('renders the list view ', async () => {
      render(
        <DataProvider
          resources={resources}
          routeProps={{ params: { resource: ['posts'] }, searchParams: {} }}
        >
          {mockChildren}
        </DataProvider>
      );

      await waitFor(() => {
        expect(mockChildren).toHaveBeenCalledWith({
          resource: 'posts',
          view: CRUDPages.list,
          loaderData: {
            data: posts,
          },
        });
      });
    });
  });

  describe('when "resource" params contains 2 segment', () => {
    it('renders the edit view ', async () => {
      render(
        <DataProvider
          resources={resources}
          routeProps={{
            params: { resource: ['posts', '1'] },
            searchParams: {},
          }}
        >
          {mockChildren}
        </DataProvider>
      );

      await waitFor(() => {
        expect(mockChildren).toHaveBeenCalledWith({
          resource: 'posts',
          view: CRUDPages.edit,
          loaderData: {
            data: posts[0],
            related: {},
          },
        });
      });
    });
  });
  describe('when "resource" params contains 2 segment and the last one is "new"', () => {
    it('renders the "new" view ', async () => {
      render(
        <DataProvider
          resources={resources}
          routeProps={{
            params: { resource: ['posts', 'new'] },
            searchParams: {},
          }}
        >
          {mockChildren}
        </DataProvider>
      );

      await waitFor(() => {
        expect(mockChildren).toHaveBeenCalledWith({
          resource: 'posts',
          view: CRUDPages.new,
        });
      });
    });
  });
  describe('when "resource" params contains an invalid resource', () => {
    it('calls notFound', async () => {
      render(
        <DataProvider
          resources={resources}
          routeProps={{
            params: { resource: ['invalidResource'] },
            searchParams: {},
          }}
        >
          {mockChildren}
        </DataProvider>
      );

      await waitFor(() => {
        expect(notFoundMock).toHaveBeenCalled();
      });
    });
  });
});
